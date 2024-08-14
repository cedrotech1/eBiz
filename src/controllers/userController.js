
import {
  createUserCustomer,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getallUsers,
  GetUserPassword,
  getUserByCodePhone,
  getUserByCodeEmail,
  updateUserCodeByEmail,
  updateUserCodeByPhone,
  getUserByPhone,
  getUserByEmail
} from "../services/userService";
import Email from "../utils/mailer";
import bcrypt from "bcrypt";
import imageUploader from "../helper/imageUplouder";

export const addCustomer = async (req, res) => {
  try {
    if ( !req.body.firstname || !req.body.phone || req.body.lastname === "" ||  !req.body.password || req.body.password === ""
  ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all information",
      });
    }

    const userExist = await getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    if (req.body.password!=req.body.comfirmpassword) {
      return res.status(400).json({
        success: false,
        message: "password mis match",
      });
    }

    const role='user'
    req.body.role=role;
     
    const newUser = await createUserCustomer(req.body);
    newUser.password = '(keek it secreate)';
    await new Email(newUser).sendAccountAdded();

 

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        firstname: newUser.firstname,  
        lastname: newUser.lastname,  
        phone: newUser.phone,  
        email: newUser.email,
        role: newUser.role,
        notify: newUser.notify,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    let users;
      users = await getallUsers();

      // if (req.user.role == "employee" || req.user.role == "customer") {

      //   users = users.filter(user => user.role === 'user');
      // }
      // if (req.user.role === "superadmin") {
  
      //   users = users.filter(user => user.role === 'user');
        
      // }

      // if (req.user.role === "user") {
  
      //   users = users.filter(user => user.role !== 'superadmin' &&  user.id!=req.user.id);
        
      // }
  
  

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const messageObject = await client.messages.create({
      body: 'hello sms',
      messagingServiceSid: process.env.messagingServiceSid,
      to: '+250784366616',
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      messageObject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};




export const getOneUser = async (req, res) => {

  try {

    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateOneUser = async (req, res) => {
  try {

    let image;

    if (req.files && req.files.file) {
      try {
        image = await imageUploader(req);
  
        if (!image || !image.url) {
          throw new Error('Upload failed or image URL missing');
        }
    
        // Assign the image URL to req.body.file
        req.body.file = image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    

    const user = await updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const deleteOneUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not superadmin",
      });
    }

    const existingUser = await getUser(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (req.user.role === "customer" && req.user.role !== "restaurentadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  
    const user = await deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const changePassword = async (req, res) => {
  console.log(req.user.id)
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if ( !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide userId, oldPassword, newPassword, and confirmPassword",
    });
  }

  try {
    const user = await GetUserPassword(req.user.id);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    console.log("Retrieved user from database:", user);

    const storedPassword = user || null;

    if (!storedPassword) {
      return res.status(500).json({
        success: false,
        message: "User password not found in the database",
      });
    }
    console.log(user);

    const validPassword = await bcrypt.compare(oldPassword, storedPassword);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await updateUser(req.user.id, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  // console.log(req.user.id)
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if ( !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide userId, oldPassword, newPassword, and confirmPassword",
    });
  }

  try {
    const user = await GetUserPassword(req.user.id);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    console.log("Retrieved user from database:", user);

    const storedPassword = user || null;

    if (!storedPassword) {
      return res.status(500).json({
        success: false,
        message: "User password not found in the database",
      });
    }
    console.log(user);

    const validPassword = await bcrypt.compare(oldPassword, storedPassword);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await updateUser(req.user.id, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const checkEmail = async (req, res) => {
//   const { email } = req.body;
//   const { phone } = req.body;

//   if (!email) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide your Email",
//     });
//   }

//   if (!phone) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide your phone",
//     });
//   }

//   try {
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "There is no account associated with that email",
//       });
//     }

//     const userx = await getUserByPhone(phone);
//     if (!userx) {
//       return res.status(400).json({
//         success: false,
//         message: "There is no account associated with that phone",
//       });
//     }


//     const timestamp = Date.now().toString().slice(-3); 
//     const randomPart = Math.floor(100 + Math.random() * 900).toString(); 
//     const code = timestamp + randomPart; 

//     const byphone = await updateUserCodeByPhone(phone, {resetkey:code});


//     await new Email(user, null, code).sendResetPasswordCode();
//     const byemail = await updateUserCodeByEmail(email, {resetkey:code});

//     return res.status(200).json({
//       success: true,
//       message: "Code sent to your email successfully",
//     });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const checkEmail = async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({
      success: false,
      message: "Please provide either your email or phone number",
    });
  }

  if (email && phone) {
    return res.status(400).json({
      success: false,
      message: "Please provide either an email or phone number, not both",
    });
  }

  try {
    let user, code, resetMessage;

    if (email) {
      user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "There is no account associated with that email",
        });
      }

      code = generateResetCode();
      await updateUserCodeByEmail(email, { resetkey: code });
      await new Email(user, null, code).sendResetPasswordCode();
      resetMessage = "Code sent to your email successfully";
    }

    if (phone) {
      user = await getUserByPhone(phone);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "There is no account associated with that phone",
        });
      }

      code = generateResetCode();
      await updateUserCodeByPhone(phone, { resetkey: code });

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);
  
      const messageObject = await client.messages.create({
        body: `Hello,\nThis is a your reset code.\nBest regards,\n${code}`,
        messagingServiceSid: process.env.messagingServiceSid,
        to: `+25${phone}`,
      });

    
      resetMessage = "Code sent to your phone successfully";
    }

    return res.status(200).json({
      success: true,
      message: resetMessage,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Helper function to generate the reset code
const generateResetCode = () => {
  const timestamp = Date.now().toString().slice(-3);
  const randomPart = Math.floor(100 + Math.random() * 900).toString();
  return timestamp + randomPart;
};


export const checkCode = async (req, res) => {
  const { code } = req.body;
  const { identifier } = req.params;

  // Regular expression to check if the identifier is an email
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  try {
    if (isEmail) {
      const user = await getUserByCodeEmail(identifier, code);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid code for the email",
        });
      }
    } else {
      const userx = await getUserByCodePhone(identifier, code);
      if (!userx) {
        return res.status(400).json({
          success: false,
          message: "Invalid code for the phone number",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Code is valid. You can now reset your password.",
    });
  } catch (error) {
    console.error("Error validating code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const ResetPassword = async (req, res) => {



  const { identifier } = req.params;

  // Regular expression to check if the identifier is an email
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  let user;
  
    if (isEmail) {
       user = await getUserByEmail(identifier);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "There is no account associated with that email",
        });
      }
    } else {
       user = await getUserByPhone(identifier);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "There is no account associated with that phone number",
        });
      }
    }

  if (!user.resetkey) {
    return res.status(400).json({
      success: false,
      message: "No Reset Code",
    });
  }
  const { newPassword, confirmPassword } = req.body;
  if ( !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide newPassword, and confirmPassword",
    });
  }

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await updateUser(user.id, { password: hashedPassword,resetkey:'' });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully, Login",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
















// 1.Post
// id
// title
// description
// date and time
// image
// type(blog,event)
// 2.choirs
// id
// name
// user
// 3.payiments
// id 
// name
// amount
// date and time
// 4.images
// id
// cid
// file
// date and time


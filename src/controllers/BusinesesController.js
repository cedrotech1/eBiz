// BusinesesController.js
import {
  createBusineses,
  getAllBusineses,
  deleteOneBusineses,
  pending,

  getone,
  updateOneBusineses,

  
  
} from "../services/BusinesesService";
import {getUserChristian} from "../services/userService";
import Email from "../utils/mailer";
import { upload } from '../utils/cloudinaryConfig';
import imageUploader from "../helper/imageUplouder";



export const addBusinesesController = async (req, res) => {
  try {
  

    console.log(req.user.id)
    req.body.userid = req.user.id;
    let image; 
    if (req.files && req.files.file) {
      try {
        image = await imageUploader(req);
        if (!image || !image.url) {
          throw new Error('Upload failed or image URL missing');
        }
        req.body.file = image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    req.body.status = "active";
    let newBusineses;
      newBusineses = await createBusineses(req.body);
    return res.status(201).json({
      success: true,
      message: "New post created successfully",
      post: newBusineses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const updateBusinesesController = async (req, res) => {
  try {
  
    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    console.log(req.user.id)
    req.body.userid = req.user.id;
    let image; 
    if (req.files && req.files.file) {
      try {
        image = await imageUploader(req);
        if (!image || !image.url) {
          throw new Error('Upload failed or image URL missing');
        }
        req.body.file = image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    req.body.status = "active";
    let newBusineses;
      newBusineses = await updateOneBusineses(req.params.id,req.body);
    return res.status(201).json({
      success: true,
      message: "Business updated successfully",
      post: newBusineses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const deleteOneBusinesesController = async (req, res) => {
  try {

    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    // console.log(req.user.role);
    if (req.user.role === "user" || data[0].korariIdd === 'null') {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not allowed to delete church Busineses",
      });
    }
    console.log(data[0].BusinesesUser.id);

    if (req.user.role === "user" && data[0].BusinesesUser.id!==req.user.id) {
      return res.status(401).json({
        success: false,
        message: "you can not delete post posted by others",
      });
    }

    const Busineses = await deleteOneBusineses(req.params.id);
  

    return res.status(200).json({
      success: true,
      message: "Busineses deleted successfully",
      Busineses:Busineses,

    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const Busineses = async (req, res) => {
  try {
    let data = await getAllBusineses();
    return res.status(200).json({
      success: true,
      message: "Busineses retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const pendingController = async (req, res) => {
  try {


    let allBusineses = await pending();
    let data;

    if (req.user.role == "employee" || req.user.role == "superadmin") {

      data = allBusineses;
    }
    if (req.user.role === "customer") {
      data = allBusineses.filter(Busineses => Busineses.userid === req.user.id);
    }
    return res.status(200).json({
      success: true,
      message: "pending Busineses retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOneBusinesesController = async (req, res) => {


  try {
    // const { id } = req.params;
    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Busineses not found",
      });
    }
    console.log(req.params.id)

  
    return res.status(200).json({
      success: true,
      message: "Busineses retrieved successfully",
      data,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// 0725998330
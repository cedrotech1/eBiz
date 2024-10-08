import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "eBiz APIs documentation",
    version: "1.0.0",
    description: "eBiz APIs documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Busineses", description: "Busineses" },
    { name: "Favorites", description: "Favorites" },
    { name: "rating", description: "rating" },


  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                phone: "0784366616",
                password: "1234",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "signup ",
        description: "signup end point",
        operationId: "adduser",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "cedrick",
                phone: "078654325",
                email: "cedrickhakuzimana@gmail.com",
                password: "1234",
                comfirmpassword: "1234",
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

 

    "/api/v1/users/check": {
      post: {
        tags: ["Users"],
        summary: "send verification code throught email or phone",
        description: "check email or phone number befor sending verification code on either email or thone",
        operationId: "getAllUserscheck",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "cedrickhakuzimana@gmail.com", 
                phone: "0784366616",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/code/{identifier}": {
      post: {
        tags: ["Users"],
        summary: "check verification code !",
        description: "checking code send  email or thone number, you can pass identifier as param either phone or email depending user preferance",
        operationId: "code",
        parameters: [
          {
            name: "identifier",
            in: "path",
            description: "User's identifier",
            required: false,
            schema: {
              type: "string",
            },
          },
          // {
          //   name: "phone",
          //   in: "path",
          //   description: "User's phone",
          //   required: false,
          //   schema: {
          //     type: "string",
          //   },
          // },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                code: "10000",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        description: "Get a user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    // "/api/v1/users/update/{id}": {
    //   put: {
    //     tags: ["Users"],
    //     summary: "Update a user",
    //     description: "Update a user",
    //     operationId: "updateOneUser",
    //     parameters: [
    //       {
    //         name: "id",
    //         in: "path",
    //         description: "User's id",
    //         required: true,
    //         schema: {
    //           type: "string",
    //         },
    //       },
    //     ],
    //     requestBody: {
    //       content: {
    //         "application/json": {
    //           schema: {
    //             $ref: "#/components/schemas/User",
    //           },
    //           example: {
    //             firstname: "John",
    //             lastname: "Doe",
    //             email: "test@example.com",
    //             phone: "08012345678",
    //           },
    //         },
    //         "multipart/form-data": {
    //           schema: {
    //             $ref: "#/components/schemas/User",
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: "User deleted successfully",
    //       },
    //       400: {
    //         description: "Bad request",
    //       },
    //       401: {
    //         description: "Unauthorized",
    //       },
    //       404: {
    //         description: "User not found",
    //       },
    //       500: {
    //         description: "Something went wrong",
    //       },
    //     },
    //   },
    // },

    "/api/v1/users/update/{id}": {
      "put": {
        "tags": ["Users"],
        "summary": "update Users",
        "description": "update Users",
        "operationId": "updateUsers",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "users's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "image file to upload"
                  },
                  "firstname": {
                    "type": "string",
                    "description": "first name"
                  },
                  "lastname": {
                    "type": "string",
                    "description": "last name"
                  },
                  "phone": {
                    "type": "string",
                    "description": "phone name"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
// resetPassword
"/api/v1/users/resetPassword/{identifier}": {
  put: {
    tags: ["Users"],
    summary: "reset  user password",
    description: "reset  user password  !!  you can pass identifier as param either phone or email depending user preferance",
    operationId: "reset-passwordr",
    parameters: [
      {
        name: "identifier",
        in: "path",
        description: "User's identifier",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
          example: {
            newPassword: "newp",
            confirmPassword: "cpass",
           
          },
        },
      },
    },
    responses: {
      200: {
        description: "User password updated  successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

    "/api/v1/users/changePassword": {
      put: {
        tags: ["Users"],
        summary: "change  user password",
        description: "change  user password  for current loged in user !! ",
        operationId: "change-passwordr",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                oldPassword: "oldpassword",
                newPassword: "newpassword",
                confirmPassword: "confirmpassword",
               
              },
            },
          },
        },
        responses: {
          200: {
            description: "User password updated  successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Delete a user api",
        operationId: "deleteOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Busineses/": {
      get: {
        tags: ["Busineses"],
        summary: "all  a Busineses",
        description: "get all busineses registered",
        operationId: "all Busineses",
        responses: {
          201: {
            description: "Busineses retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/Busineses/add": {
      "post": {
        "tags": ["Busineses"],
        "summary": "Add Busines",
        "description": "Add Busines",
        "operationId": "addBusinesesUpload",
        // parameters: [
        //   {
        //     name: "id",
        //     in: "path",
        //     description: "Busineses's id",
        //     required: true,
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "profile image for business"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of business"
                  },
                  "status": {
                    "type": "string",
                    "description": "Status of the business"
                  },
                  "business_name": {
                    "type": "string",
                    "description": "Name of the business"
                  },
                  "tin_number": {
                    "type": "string",
                    "description": "Tax Identification Number of the business"
                  },
                  "address": {
                    "type": "string",
                    "description": "Business address"
                  },
                  "city": {
                    "type": "string",
                    "description": "City where the business is located"
                  },
                  "state": {
                    "type": "string",
                    "description": "State where the business is located"
                  },
                  "country": {
                    "type": "string",
                    "description": "Country where the business is located"
                  },
                  "postal_code": {
                    "type": "string",
                    "description": "Postal code of the business location"
                  },
                  "phone_number": {
                    "type": "string",
                    "description": "Phone number of the business"
                  },
                  "email": {
                    "type": "string",
                    "description": "Email address of the business"
                  },
                  "website": {
                    "type": "string",
                    "description": "Website of the business"
                  },
                  "business_sector": {
                    "type": "string",
                    "description": "Sector in which the business operates"
                  },
                  "latitude": {
                    "type": "number",
                    "format": "float",
                    "description": "Latitude coordinate of the business location"
                  },
                  "longitude": {
                    "type": "number",
                    "format": "float",
                    "description": "Longitude coordinate of the business location"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
    "/api/v1/Busineses/update/{id}": {
      "put": {
        "tags": ["Busineses"],
        "summary": "update  Business",
        "description": "update Busines",
        "operationId": "updateBusinesesUpload",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Busineses's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "profile image for business"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of  business"
                  },
                  "status": {
                    "type": "string",
                    "description": "Status of the business"
                  },
                  "business_name": {
                    "type": "string",
                    "description": "Name of the business"
                  },
                  "tin_number": {
                    "type": "string",
                    "description": "Tax Identification Number of the business"
                  },
                  "address": {
                    "type": "string",
                    "description": "Business address"
                  },
                  "city": {
                    "type": "string",
                    "description": "City where the business is located"
                  },
                  "state": {
                    "type": "string",
                    "description": "State where the business is located"
                  },
                  "country": {
                    "type": "string",
                    "description": "Country where the business is located"
                  },
                  "postal_code": {
                    "type": "string",
                    "description": "Postal code of the business location"
                  },
                  "phone_number": {
                    "type": "string",
                    "description": "Phone number of the business"
                  },
                  "email": {
                    "type": "string",
                    "description": "Email address of the business"
                  },
                  "website": {
                    "type": "string",
                    "description": "Website of the business"
                  },
                  "business_sector": {
                    "type": "string",
                    "description": "Sector in which the business operates"
                  },
                  "latitude": {
                    "type": "number",
                    "format": "float",
                    "description": "Latitude coordinate of the business location"
                  },
                  "longitude": {
                    "type": "number",
                    "format": "float",
                    "description": "Longitude coordinate of the business location"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
  
   
    "/api/v1/Busineses/one/{id}": {
      get: {
        tags: ["Busineses"],
        summary: "get one  a Busineses",
        description: "customer/admin get one Busineses",
        operationId: "getBusineses",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Busineses's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Busineses retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Busineses/delete/{id}": {
      delete: {
        tags: ["Busineses"],
        summary: "delete a Busineses",
        description: "delete Busineses",
        operationId: "deleteBusineses",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Busineses's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Busineses rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/favorite": {
      post: {
        tags: ["Favorites"],
        summary: "add favorite ",
        description: "adding business to user favorites",
        operationId: "favorites",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                businessId: "1",
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/favorite/all": {
      get: {
        tags: ["Favorites"],
        summary: "Get all busness Favorites",
        description: "Get all users business favorite",
        operationId: "My_Favorites",
        responses: {
          200: {
            description: "business favorite ritrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/favorite/{businessId}": {
      delete: {
        tags: ["Favorites"],
        summary: "remove Favorites",
        description: "remove business as user favorite  api",
        operationId: "removefav",
        parameters: [
          {
            name: "businessId",
            in: "path",
            description: "business id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "favorite business deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/reviews": {
      post: {
        tags: ["rating"],
        summary: "add rating ",
        description: "adding business rating ",
        operationId: "rating",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                 businessId: 1,  
                 rating: 4,      
                 review: "Great service, highly recommend!" 
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/businesses/{businessId}/reviews": {
      get: {
        tags: ["rating"],
        summary: "get one  a rating",
        description: "Busineses rating and reviews",
        operationId: "getBusineses rating and reviews",
        parameters: [
          {
            name: "businessId",
            in: "path",
            description: "Busineses's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Busineses rating and reviews retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    

  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User's username",
          },
         
          role: {
            type: "string",
            description: "User's role",
          },
    
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          password: {
            type: "string",
            description: "User's ponts",
          },

        },
      },
    
    

    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;

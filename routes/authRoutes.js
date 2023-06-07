const express = require("express");
const userModel = require("../model");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// SignUp API
app.post("/register", async (request, response) => {
  userModel
    .find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return response.status(409).json({ message: "Mail Exists" });
      } else {
        bcrypt.hash(request.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new userModel({
              first_name: request.body.first_name,
              last_name: request.body.last_name,
              email: request.body.email,
              phone: request.body.phone,
              designation: request.body.designation,
              password: hash,
            });
            user.save().then((result) => {
              console.log(result);
              response
                .status(201)
                .json({
                  message: "User Created",
                })
                .catch((err) => {
                  console.log(err);
                  return response.status(500).json({
                    error: err,
                  });
                });
            });
          }
        });
      }
    });
});

// login API
app.post('/login', async(request, response,next) => {
    userModel.findOne({email: request.body.email}).exec().then(user => {
      bcrypt.compare(request.body.password , user.password , function (error,result){
        if(error){
          return response.status(401).json({
            message: "Authentication failed",
          });
        }
          console.log(result, error, request.body.password, user.password);
        if(result){
          const token = jwt.sign(
            {
              email: user.email
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return response.status(200).json({
                  message: "User logged In",
                })
        }else{
            return response.send("Authentication failed");
        }
      })
    }).catch((err) => {
                  console.log(err,'4');
                  return response.status(500).json({
                    error: err,
                  })
                });
            
})

module.exports = app;

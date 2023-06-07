const express = require("express");
const userModel = require("../model");
const app = express();

// Create a new user (POST API)
app.post("/add_user", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Read all users (GET API)
app.get("/users", async (request, response) => {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Delete User
// app.delete("/delete/:id", async (request, response) => {
//   const users = await userModel.findByIdAndRemove({});
//   users(request.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// })

module.exports = app;

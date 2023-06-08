const express = require("express");
const userModel = require("../model");
const app = express();

// Create a new user (POST)
app.post("/add_user", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Read all users (GET)
app.get("/users", async (request, response) => {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Delete User (DELETE)
app.delete("/delete/:id", async (request, response) => {
  const id = request.params.id;
  userModel.findByIdAndDelete(id).then((result) => {
    if(!result) {
      return response.status(404).json({
        message:"User Not found"
      })
    } 
    return response.json({ message: "Delete Done"})
  }).catch((error) => {
    response.status(500).send(error);
  })
})

// Update User 
app.put("/update/:id",async(request,response) => {
  const id = request.params.id;
  const body = request.body;
  if(body?.password || body?.id){
    response.status(403).json({
      message: "Not modifiable here"
    })
  }else{
  userModel.findByIdAndUpdate(id,body,{new: true,upsert: true}).then((result) => {
    if(!result){
      return response.status(404).json({
        message: "User Not found",
      });
    }
    return response.json(result)
  }).catch((error)=>{
    response.status(500).send(error);
  })
}
})

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const opRoutes = require("./routes/curdRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", opRoutes);
app.use("/api", authRoutes);


app.use(cors());

mongoose.connect(process.env.URI, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

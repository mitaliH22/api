const express = require("express");
const mongoose = require("mongoose");
const opRoutes = require("./routes/curdRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

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
// MongoDB uri for connection
const uri =
  "mongodb+srv://mitaliharsh:sun123ARC@cluster0.jsxdi6w.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

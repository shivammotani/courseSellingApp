const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

mongoose.connect(
  "mongodb+srv://shivammotani:Temp%40123@cluster0.lrnlzko.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

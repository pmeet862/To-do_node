const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve("./.env") });
const cors = require("cors");

const TodoRoute = require("./Routes/todo.route");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://scrapper:Coder%40040@13.126.232.194/scrapper")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log(err.message));

app.use("/todo", TodoRoute);

app.listen(PORT, () => {
  console.log(`server is started on http://localhost:${PORT}`);
});

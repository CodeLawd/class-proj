const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const User = require("./models/userModel");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err.message));

app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

app.post("/api/v1/users", async (req, res) => {
  // const newUser = new User(req.body);
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.create({
      name,
      email,
      phone: +phone,
      address,
    });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));

const { mongoose } = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("mongodb connection established");
  } catch (err) {
    console.log(err.message);
  }
};

db();

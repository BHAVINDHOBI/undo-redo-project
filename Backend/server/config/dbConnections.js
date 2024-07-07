require("dotenv").config();
const mongoose = require("mongoose");
const dataBaseUrl = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(dataBaseUrl);
    console.log(" DataBase connected succesfully ");
  } catch (err) {
    console.log("error in connecting Database = ", err);
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

exports.connect = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(error);
    });
};

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const User = require("./db_model");
const auth = require("./auth");
const model = require("./db_model");

require("dotenv").config();
require("./db").connect();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(morgan("dev"));


app.post("/register", async (req, res) => {
  try {
    const { name, surname, username, password, email } = req.body;

    if (!(name && surname && username && password && email)) {
      res.status(400).send("all input is required");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return console.log("user already exist");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, username }, process.env.TOKEN, {
      expiresIn: "10h",
    });

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("all input is required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN,
        {
          expiresIn: "10h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/", auth, async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:username", auth, async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!username) {
      res.json({
        message: "user doesnt exist",
      });
      return next(error);
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/:username", auth, async (req, res) => {
  try {
    const { username } = req.params;
    const { name, surname } = req.body;

    const user = await User.findOne({ username });
    const result = await model.validate({ name, surname });

    if (!username) {
      res.json({
        message: "user doesnt exist",
      });
      return next(error);
    }

    const updatedHuman = await User.updateOne(
      {
        username,
      },
      { $set: req.body },
      { upsert: true }
    );

    res.json(updatedHuman);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:username", auth, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!username) {
      res.json({
        message: "user doesnt exist",
      });
    }

    await user.remove({ username });

    res.json({
      message: "user has been deleted",
    });
  } catch (error) {
    console.log(error);
  }
});



app.listen(port || 5000, () => {
  console.log(`server running on port ${port}`);
});

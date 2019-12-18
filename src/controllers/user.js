const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * Create a new user
 */
// router.post("/", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

/**
 * Create a new user
 */
router.post("/api", (req, res) => {
  const userDB = new User(req.body);
  return userDB
    .save()
    .then(user => {
      console.log(user);
      return res.status(201).json({ msg: "user created successfull" });
    })
    .catch(() => {
      return res.status(404).json({ msg: "user not created" });
    });
});

/**
 * Login a registered user
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    console.log("this is users",user);
    
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    // const token = await user.generateAuthToken();
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * get all users
 */
router.get("/", (_req, res) => {
  User.find()
    .sort({ firstName: "asc" })
    .then(userData => {
      return res.status(200).json({ userData });
    })
    .catch(err => {
      return res.status(500).json({ msg: `err occour: ${err}` });
    });
});

router.get("/log", (req, res) => {
  //get single users by email
  const username = req.params.username;
  console.log(username);
  
  User.findOne({ username })
    .then(userData => {

      if (userData) {
        return res.status(200).json(userData);
      }
      return res.status(404).json({ msg: userData });
    })
    .catch(err => {
      return res.status(500).json({ msg: `err occour: ${err}` });
    });
});

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

router.post("me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//update user
router.patch("/:id", (req, res) => {
  //get values from frontend
  const userID = req.params.id;
  const userBody = req.body;

  return User.update({ _id: userID }, { $set: userBody })
    .then(user => {
      console.log(user);
      return res.status(201).json({ msg: "user updated successfully" });
    })
    .catch(err => {
      res.status(404).json({ msg: "user with the ID not found" });
      console.log(err);
      return;
    });
});

//get delete a  user
router.delete("/:id", (req, res) => {
  const userID = req.params.id;

  return User.findByIdAndDelete(userID)
    .then(user => {
      console.log(user);
      return res.status(200).json({ msg: "user deleted" });
    })
    .catch(err => {
      res.status(404).json({ msg: "user with the ID not found" });
      console.log(err);
      return;
    });
});

module.exports = router;

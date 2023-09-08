const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middlewares/fetchuser')

const JWT_secret = "secret"

//Router 1 - Create user using POST method. No login required
router.post('/createuser', [
  body('name', 'Name cannot be blank').exists(),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', "Password should be a combination of one uppercase, one lower case, one special character, one digit and min 8 characters.").exists()
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "This email is already in use." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }

})

//Router 2 - Login using POST method. No login required

router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password length should be atleast 5').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})

//Router 3 - Fetch user data using POST method. Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})


module.exports = router
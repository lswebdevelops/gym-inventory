const express = require("express");
const router = express.Router();
const webSiteDescription =
  "Simple website created using NodeJs, Express and MongoDb";
const Student = require("../models/Student");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWTSECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * check login
 */

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("unauthorized");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.render("unauthorized");
  }
};

/**
 * get
 * Home
 */

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: `Admin`,
      description: webSiteDescription,
    };

    res.render("admin/login", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * post/
 * Admin - Check login
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.render("invalidCredentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.render("invalidCredentials");
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    
    // Redirect to the dashboard upon successful login
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * get/
 * dashboard
 */

router.get("/dashboard", authMiddleware, async (req, res) => {
  res.render("admin/dashboard");
});

/**
 * post/
 * Admin - Register
 */

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error " });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const webSiteDescription =
  "Simple website created using NodeJs, Express and MongoDb";
const Student = require("../models/Student");
const User = require("../models/User");
const adminLayout = '../views/layouts/admin'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



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
       if(req.body.username === 'admin' && req.body.password === 'password')
{
      res.send('you are logged in ')}
      else{
        res.send('wrong one')
      }
    } catch (error) {
      console.log(error);
    }
  });
  

module.exports = router;
/**
 * post/
 * Admin - Register
 */

router.post("/register", async (req, res) => {
 
    try {    
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
        
      try {
        const user = await User.create({ username, password: hashedPassword })
        res.status(201).json({ message: "User Created", user });        
      
      } catch (error) {
        if(error.code === 11000) {
            res.status(409).json( { message: "User already in use"})
        }
        res.status(500).json({message: "Internal server error "})
      }

       
    } catch (error) {
      console.log(error);
    }
  });
  

module.exports = router;


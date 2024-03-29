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
  const locals = {
    title: `Dashboard`,
    description: webSiteDescription,
  };
  const token = req.cookies.token;
  if (!token) {
    return res.render("unauthorized", { locals, layout: adminLayout });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.render("unauthorized" ,{ locals, layout: adminLayout });
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
  const locals = {
    title: `Admin`,
    description: webSiteDescription,
  };
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.render("invalidCredentials", { locals, layout: adminLayout });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("invalidCredentials", { locals, layout: adminLayout });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    // Redirect to the dashboard upon successful login

    res.redirect("/dashboard",);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * get/
 * admin dashboard
 */

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: `Dashboard`,
      description: webSiteDescription,
    };

    const data = await Student.find();
    res.render("admin/dashboard",{
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * get/
 * admin create new student
 */

router.get("/add-student", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: `Add Student`,
      description: webSiteDescription,
    };

    const data = await Student.find();
   
    res.render("admin/add-student", {
      locals,    
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * post/
 * admin create new student
 */

router.post("/add-student", authMiddleware, async (req, res) => {
  try {   
    try {
  
const {
    name,   
    details,
    age,
    gender,
    initialWeight,
    currentWeight,    
    height,     
    attendanceDays,
    points,
    updatedAt,
} = req.body;
 // Check if the name already exists



const newStudent = new Student({
    name,   
    details,
    age,
    gender,
    initialWeight,
    currentWeight,    
    height,      
    attendanceDays: attendanceDays.split(','), // assuming it's a comma-separated string
    points,
    updatedAt: new Date(),
});


      await Student.create(newStudent);
      res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});

/**
 * get/
 * admin create new student
 */

router.get("/edit-student/:id", authMiddleware, async (req, res) => {
  try {
      const locals = {
          title: `Edit Student`,
          description: webSiteDescription,
      };

      const student = await Student.findOne({ _id: req.params.id });

              // Check if the student object and its date properties exist
        if (student &&  student.updatedAt) {
            // Format the date properties to string representations
           
           
            student.updatedAt = student.updatedAt.toDateString();
        }

      res.render('admin/edit-student', {
          data: student,
          layout: adminLayout,
          locals
      });
  
    } catch (error) {
      console.log(error);
    }
  });





/**
 * put/
 * admin create new student
 */

router.put("/edit-student/:id", authMiddleware, async (req, res) => {
    try {   

        await Student.findByIdAndUpdate(req.params.id,  {
            name: req.body.name,            
            points: req.body.points,           
           
            initialWeight: req.body.initialWeight,
            currentWeight: req.body.currentWeight,
            age: req.body.age,
            gender: req.body.gender,
            height: req.body.height,
                      
            attendanceDays: req.body.attendanceDays,
            details: req.body.details,
            updatedAt: Date.now(),
        })

        res.redirect(`/dashboard`)
  
    } catch (error) {
      console.log(error);
    }
  });

/**
 * delete/
 * admin delete
 */
router.delete("/delete-student/:id", authMiddleware, async (req, res) => {
    try {
        await Student.deleteOne( { _id: req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }
});
/**
 * logout/
 * admin logout
 */
router.get("/logout",  (req, res) => {
  const locals = {
    title: `Logout`,
    description: webSiteDescription,
};

    res.clearCookie('token')
    res.render('logout-success', {
      locals, 
      layout: adminLayout

    })
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

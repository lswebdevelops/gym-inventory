const express = require("express");
const router = express.Router();
const webSiteDescription =
  "Simple website created using NodeJs, Express and MongoDb";
const Student = require("../models/Student");



/**
 * get
 * Home
 */
router.get("/", (req, res) => {
  const locals = {
    title: "Gym Inventory",
    description: webSiteDescription,
  };

  res.render("index", {
    locals,
    currentRoute: "/",
  });
});
/**
 * Get/
 * students
 *
 */

router.get("/students", async (req, res) => {
  const locals = {
    title: "Students",
    description: webSiteDescription,
  };

  try {
    const data = await Student.find();
    res.render("students", { locals, data,  currentRoute: "/students", });
  } catch (error) {
    console.log(error);
  }
});

/**
 * post/
 * student/:id
 *
 */
router.get("/student/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Student.findById({ _id: slug });

    const locals = {
      title: `Student: ${data.name}`,
      description: webSiteDescription,
    };

    res.render("student", { locals, data, currentRoute: `/student/${slug}`, });
  } catch (error) {
    console.log(error);
  }
});

/**
 * post/
 * search
 *
 */

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: `Search`,
      description: webSiteDescription,
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Student.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { username: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        // {age: { $regex: new RegExp(searchNoSpecialChar, "i")}}
      ],
    });

    res.render("search", {
      locals,
      data,
      currentRoute:  '/search'
       });
  } catch (error) {
    console.log(error);
  }
});


// Ranking 

router.get('/ranking', async (req, res) => {
  try {
    const rankedStudents = await Student.find().sort({ points: -1 });
    res.render('ranking', { rankedStudents ,
      currentRoute: "/", });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





// router.get("/paidOnTime", (req, res) => {
//   const locals = {
//     title: "Bills Paid on Time",
//     description: webSiteDescription,
//   };

//   res.render("paidOnTime", { locals, currentRoute: "/paidOnTime",});
// });

// router.get("/stillDue", (req, res) => {
//   const locals = {
//     title: "Bills Still Due",
//     description: webSiteDescription,
//   };
//   res.render("stillDue", { locals });
// });
router.get("/confirmedPresence", (req, res) => {
  const locals = {
    title: "Confirmed Presence",
    description: webSiteDescription,
  };
  res.render("confirmedPresence", { locals ,currentRoute: "/confirmedPresence", });
});

router.get("/ranking", (req, res) => {
  const locals = {
    title: "Ranking",
    description: webSiteDescription,
  };
  res.render("ranking", { locals ,currentRoute: "/ranking", });
});

function insertStudentData() {
  Student.insertMany([
    {
      name: "Paula",

      details: "Some details about Paula",
      age: 25,
      gender: "female",
      initialWeight: 150,
      currentWeight: 140,

      height: 160,

      attendanceDays: ["Monday", "Wednesday", "Friday"],
    },
    {
      name: "John",

      details: "Some details about John",
      age: 30,
      gender: "male",
      initialWeight: 180,
      currentWeight: 175,

      height: 175,

      attendanceDays: ["Tuesday", "Thursday"],
    },
    {
      name: "Alice",

      details: "Some details about Alice",
      age: 28,
      gender: "female",
      initialWeight: 140,
      currentWeight: 135,

      height: 155,

      attendanceDays: ["Monday", "Wednesday", "Friday"],
    },
    {
      name: "Bob",

      details: "Some details about Bob",
      age: 32,
      gender: "male",
      initialWeight: 200,
      currentWeight: 195,

      height: 180,

      attendanceDays: ["Monday", "Tuesday", "Thursday"],
    },
    {
      name: "Eva",

      details: "Some details about Eva",
      age: 26,
      gender: "female",
      initialWeight: 130,
      currentWeight: 128,

      height: 150,

      attendanceDays: ["Wednesday", "Friday"],
    },
    {
      name: "Charlie",

      details: "Some details about Charlie",
      age: 29,
      gender: "male",
      initialWeight: 170,
      currentWeight: 165,
      height: 175,

      attendanceDays: ["Tuesday", "Thursday"],
    },
  ]);
}

// insertStudentData ()
// async function updatePoints() {
//   try {
//     // Assuming each student gets 1 point when they come to the gym
//     const pointsToAdd = 1;

//     // Increment points for all students
//     const result = await Student.updateMany({}, { $inc: { points: pointsToAdd } });

//     console.log(`${result.nModified} students updated successfully.`);
//   } catch (error) {
//     console.error('Error updating points:', error);
//   }
// }

// Call the function to update points
// updatePoints();
module.exports = router;

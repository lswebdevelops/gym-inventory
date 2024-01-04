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

  res.render("index", { locals });
});
/**
 * Get/
 * students
 *
 */

router.get("/students", async (req, res) => {
  const locals = {
    title: "All Students",
    description: webSiteDescription,
  };

  try {
    const data = await Student.find();
    res.render("students", { locals, data });
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
    const data = await Student.findById( { _id:slug });

    const locals = {
      title: `Student: ${data.name}`,
      description: webSiteDescription,
    };


    res.render("student", { locals, data });
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

    let  searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const data = await Student.find({
      $or: [
        {name: { $regex: new RegExp(searchNoSpecialChar, "i")}},
        {username: { $regex: new RegExp(searchNoSpecialChar, "i")}},
        // {age: { $regex: new RegExp(searchNoSpecialChar, "i")}}
      ]
    })

    res.render("search", { 
      locals,
       data,
      });
  } catch (error) {
    console.log(error);
  }
});










router.get("/paidOnTime", (req, res) => {
  const locals = {
    title: "Bills Paid on Time",
    description: webSiteDescription,
  };

  res.render("paidOnTime", { locals });
});

router.get("/stillDue", (req, res) => {
  const locals = {
    title: "Bills Still Due",
    description: webSiteDescription,
  };
  res.render("stillDue", { locals });
});
router.get("/confirmedPresence", (req, res) => {
  const locals = {
    title: "Confirmed Presence",
    description: webSiteDescription,
  };
  res.render("confirmedPresence", { locals });
});

router.get("/ranking", (req, res) => {
  const locals = {
    title: "Ranking",
    description: webSiteDescription,
  };
  res.render("ranking", { locals });
});
router.get("/unauthorized", (req, res) => {
  const locals = {
    title: "Unauthorized",
    description: webSiteDescription,
  };
  res.render("unauthorized", { locals });
});


// function insertStudentData() {
//   Student.insertMany([
//     {
//       name: "Paula",
//       username: "paula01",
//       details: "Some details about Paula",
//       age: 25,
//       gender: "female",
//       initialWeight: 150,
//       currentWeight: 140,
//       applyedToSchoolAt: new Date("2022-01-01"),
//       height: 160,
//       lastPaymentDate: new Date("2023-05-01"),
//       
//       attendanceDays: ["Monday", "Wednesday", "Friday"],
//     },
//     {
//       name: "John",
//       username: "john02",
//       details: "Some details about John",
//       age: 30,
//       gender: "male",
//       initialWeight: 180,
//       currentWeight: 175,
//       applyedToSchoolAt: new Date("2022-02-15"),
//       height: 175,
//       lastPaymentDate: new Date("2023-04-15"),
//       
//       attendanceDays: ["Tuesday", "Thursday"],
//     },
//     {
//       name: "Alice",
//       username: "alice03",
//       details: "Some details about Alice",
//       age: 28,
//       gender: "female",
//       initialWeight: 140,
//       currentWeight: 135,
//       applyedToSchoolAt: new Date("2022-03-10"),
//       height: 155,
//       lastPaymentDate: new Date("2023-03-10"),
//       
//       attendanceDays: ["Monday", "Wednesday", "Friday"],
//     },
//     {
//       name: "Bob",
//       username: "bob04",
//       details: "Some details about Bob",
//       age: 32,
//       gender: "male",
//       initialWeight: 200,
//       currentWeight: 195,
//       applyedToSchoolAt: new Date("2022-04-20"),
//       height: 180,
//       lastPaymentDate: new Date("2023-02-20"),
//       
//       attendanceDays: ["Monday", "Tuesday", "Thursday"],
//     },
//     {
//       name: "Eva",
//       username: "eva05",
//       details: "Some details about Eva",
//       age: 26,
//       gender: "female",
//       initialWeight: 130,
//       currentWeight: 128,
//       applyedToSchoolAt: new Date("2022-05-05"),
//       height: 150,
//       lastPaymentDate: new Date("2023-01-05"),
//       
//       attendanceDays: ["Wednesday", "Friday"],
//     },
//     {
//       name: "Charlie",
//       username: "charlie06",
//       details: "Some details about Charlie",
//       age: 29,
//       gender: "male",
//       initialWeight: 170,
//       currentWeight: 165,
//       applyedToSchoolAt: new Date("2022-06-15"),
//       height: 175,
//       lastPaymentDate: new Date("2023-06-15"),
//       
//       attendanceDays: ["Tuesday", "Thursday"],
//     },
//   ]);
// }

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

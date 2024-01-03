const express = require("express");
const router = express.Router();
const webSiteDescription = "Simple website created using NodeJs, Express and MongoDb";

router.get("/", (req, res) => {
  const locals = {
    title: "Gym Inventory",
    description: webSiteDescription,
  };
  res.render("index", { locals });
});



router.get("/allStudents", (req, res) => {
  const locals = {
    title: "All Students",
    description: webSiteDescription,
  };

  res.render("allStudents", { locals });
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

module.exports = router;

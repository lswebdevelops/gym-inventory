require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const app = express();
const session = require("express-session");
const PORT = 3000 || process.env.PORT;

// connect to DB
connectDB();

// adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie timeout
    cookie: {
      maxAge: 3600000,
    },
  })
);
// public folder setting
app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes:
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

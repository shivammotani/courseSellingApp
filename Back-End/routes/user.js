const express = require("express");
const { User, Course } = require("../db");
const { generateUserJwt, authenticateUserJwt } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } else {
    res.status(403).json({ message: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const existingUser = await User.findOne({ username, password });
  if (existingUser) {
    const token = generateUserJwt(existingUser);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

router.get("/courses", authenticateUserJwt, async (req, res) => {
  // logic to list all courses
  var publishedCourses = await Course.find({ published: true });
  res.json({ courses: publishedCourses });
});

router.post("/courses/:courseId", authenticateUserJwt, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const usr = await User.findOne({ username: req.user.username });
    if (usr.purchasedCourse.includes(req.params.courseId)) {
      res.status(401).json({ message: "Course already purchased" });
    } else {
      if (course.published) {
        usr.purchasedCourse.push(course);
        await usr.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(401).json({ message: "Course is not yet published" });
      }
    }
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

router.get("/purchasedCourses", authenticateUserJwt, async (req, res) => {
  // logic to view purchased courses
  const usr = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourse"
  );
  if (usr) {
    res.json({ purchasedCourses: usr.purchasedCourse });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;

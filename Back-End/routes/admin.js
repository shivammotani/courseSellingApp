const express = require("express");
const { Course, Admin } = require("../db");
const {
  generateAdminJwt,
  authenticateAdminJwt,
} = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateAdminJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    return res.status(403).json("Admin doesn't exist");
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generateAdminJwt(req.body);
    res.json({ message: "Admin created successfully", token });
  } else {
    res.status(403).json({ message: "Admin already exists" });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  console.log(req.headers);
  const existingAdmin = await Admin.findOne({ username, password });
  if (existingAdmin) {
    const token = generateAdminJwt(existingAdmin);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

router.post("/courses", authenticateAdminJwt, async (req, res) => {
  // logic to create a course
  const dbCourse = new Course(req.body);
  await dbCourse.save();
  res.json({
    message: "Course created successfully",
    courseId: dbCourse.id,
  });
});

router.put("/courses/:courseId", authenticateAdminJwt, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateAdminJwt, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses: courses });
});

router.get("/course/:courseId", authenticateAdminJwt, async (req, res) => {
  // logic to get all courses
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;

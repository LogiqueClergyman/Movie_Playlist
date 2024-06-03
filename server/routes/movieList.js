const express = require("express");
const MovieList = require("../model/movieList.js");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("hi");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Create a new movie list
router.post("/create", authenticate, async (req, res) => {
  console.log(req.body);
  const { name, movies, isPublic, thumbnail } = req.body;
  try {
    const movieList = new MovieList({
      userId: req.user.id,
      name,
      movies,
      isPublic,
      thumbnail,
    });
    await movieList.save();
    res.status(201).json(movieList);
  } catch (err) {
    res.status(400).json({ error: "Failed to create movie list" });
  }
});

// Get all public movie lists
router.get("/public", async (req, res) => {
  try {
    const lists = await MovieList.find({ isPublic: true }).populate(
      "userId",
      "username"
    );
    res.json(lists);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch movie lists" });
  }
});

// Get user's movie lists
router.get("/user", authenticate, async (req, res) => {
  try {
    const lists = await MovieList.find({ userId: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch movie lists" });
  }
});

// Update a movie list
router.put("/:id", authenticate, async (req, res) => {
  const { name, movies, isPublic, thumbnail } = req.body;
  try {
    const list = await MovieList.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, movies, isPublic, thumbnail },
      { new: true }
    );
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: "Failed to update movie list" });
  }
});

//get a list based on id
router.get("/:id", async (req, res) => {
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch movie list" });
  }
});

// Delete a movie list
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const list = await MovieList.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete movie list" });
  }
});

module.exports = router;

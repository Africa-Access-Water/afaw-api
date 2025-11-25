const { cloudinary, postMediaStorage } = require("../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage: postMediaStorage });
const db = require("../config/db"); // or wherever your knex instance is
const { getAllHandler, getByIdHandler, deleteHandler } = require("../utils/crudHelpers");

// CREATE
const createPost = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const image = req.file?.path || null; // cloudinary image path

    const [newPost] = await db("posts")
      .insert({ title, content, type, image_url: image })
      .returning("*");
      
    console.log("New Post Created:", newPost);

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// READ ALL
const getPosts = getAllHandler(db, "posts", "posts");

// READ ONE
const getPostById = getByIdHandler(db, "posts", "Post");

// UPDATE
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;
    const image = req.file?.path;

    const updatedFields = { title, content, type };
    if (image) updatedFields.image_url = image;

    const [updatedPost] = await db("posts")
      .where({ id })
      .update(updatedFields)
      .returning("*");

    res.json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// DELETE
const deletePost = deleteHandler(db, "posts", "Post");

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};


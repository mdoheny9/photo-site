import express from "express"
import { getAllPosts, getUserPosts, createPost, createUser, getUser } from "../controller/postController.js";

const router = express.Router();

router.get("/posts", getAllPosts);

router.get("/posts/:username", getUserPosts);

router.post("/upload", createPost);

router.post("/sign-up", createUser);

router.post("/sign-in", getUser);

export default router;
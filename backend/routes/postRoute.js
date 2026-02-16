import express from "express"
import { getAllPosts, getUserPosts, createPost, createUser, getUser } from "../controller/postController.js";
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/sign-up", createUser);

router.post("/sign-in", getUser);

router.get("/posts", getAllPosts);

router.get("/posts/:username", getUserPosts);

router.post("/upload", checkToken, createPost);

export default router;
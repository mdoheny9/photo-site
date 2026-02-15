import express from "express"
import { getAllPosts, createPost, createUser, getUser } from "../controller/postController.js";

const router = express.Router();

router.get("/posts", getAllPosts);

router.post("/upload", createPost);

router.post("/sign-up", createUser);

router.post("/sign-in", getUser);

export default router;
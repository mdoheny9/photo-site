import express from "express"
import { getPosts, createPost, createUser, getUser } from "../controller/postController.js";

const router = express.Router();

router.get("/posts", getPosts)

router.post("/upload", createPost);

router.post("/sign-up", createUser);

router.post("/sign-in", getUser);

export default router;
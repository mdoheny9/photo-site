import express from "express"
import { getAll, create } from "../controller/postController.js";

const router = express.Router();

router.get("/posts", getAll)

router.post("/post", create);

export default router;
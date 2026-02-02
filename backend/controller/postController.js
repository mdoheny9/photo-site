import Post from "../model/Post.js";
import User from "../model/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getPosts = async(req, res) => { // GET "/posts"
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting posts" });
    }
}

export const createPost = async(req, res) => { // POST "/upload"
    try {
        const { author, description, img, date } = req.body;
        const newPost = new Post({
            author: {
                name: author,
                avatar: "default-avatar"
            },
            description,
            img,
            date
        });
        const savedData = await newPost.save();
        res.status(201).json(savedData);

    } catch (err) {
        res.status(500).json({errorMessage:err.message })
    }
}

export const getUser = async(req, res) => { // POST "sign-in"
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found")
            return res.status(400).json({message: "User does not exist." });
        }

        const is_correct = await bcrypt.compare(password, user.password);

        if (!is_correct) {
            return res.status(400).json({message: "Password is incorrect" });
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
        console.log("Generated JWT successfully!");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting users" });
    }
}

export const createUser = async(req, res) => { // POST "/sign-up"
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message: "User already exists." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        
        const savedData = await newUser.save();

        const token = jwt.sign(
            {
                email: savedData.email,
                id: savedData._id
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({errorMessage:err.message })
    }
}
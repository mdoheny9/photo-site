import Post from "../model/Post.js";
import User from "../model/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getAllPosts = async(req, res) => { // GET "/posts"
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting posts" });
    }
}

export const getMyPosts = async(req, res) => { // GET "/posts/:userId"
    try {
        const userId = req.userId;
        const user = await User.findOne({ "_id": userId });
        const username = user.username;
        const posts = await Post.find({ "author.name": username })
        return res.status(201).json({username, posts});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error getting users posts" });
    }

}

export const getUserPosts = async(req, res) => { // GET "/posts/:username"
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        const posts = await Post.find({ "author.name": username })
        res.status(201).json({user, posts});
        console.log(`User email is: ${user.email}`)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting users posts" });
    }

}

export const createPost = async(req, res) => { // POST "/upload"
    try {
        const { description, img, date } = req.body;
        const userId = req.userId;
        const user = await User.findOne({ "_id": userId });
        const newPost = new Post({
            author: {
                name: user.username,
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
                userId: user._id
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
                userId: savedData._id
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({errorMessage:err.message })
    }
}
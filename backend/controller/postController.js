import Post from "../model/Post.js";
import User from "../model/User.js";

export const getPosts = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting posts" });
    }
}

export const createPost = async(req, res) => {
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

export const getUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(400).json({message: "Password is incorrect" });
            } 
        } else {
            console.log("User not found")
            res.status(400).json({message: "User does not exist. Sign up?" });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting users" });
    }
}

export const createUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message: "User already exists." });
        }
        
        const savedData = await newUser.save();
        res.status(201).json(savedData);

    } catch (err) {
        res.status(500).json({errorMessage:err.message })
    }
}
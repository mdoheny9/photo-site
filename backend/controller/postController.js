import Post from "../model/Post.js";

export const getAll = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting posts" });
    }
}

export const create = async(req, res) => {
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
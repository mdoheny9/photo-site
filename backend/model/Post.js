import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
    name: String,
    content: String
});

const Post = model('Post', postSchema);
export default Post;
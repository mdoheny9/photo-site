import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
});

const postSchema = new Schema({
    img: { type: String, required: true },
    description: { type: String, required: false },
    author: { type: authorSchema, required: true },
    date: { type: String, required: true }
});

const Post = model('Post', postSchema);
export default Post;
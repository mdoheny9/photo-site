import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import Post from './model/Post.js';

const app = express(); // initialize app

app.use(cors()); // mount cors
app.use(express.json()); // mount express.json 

dotenv.config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

async function start() {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("DB Connection Successful");

    app.get('/getPosts', (req, res) => {
      Post.find({})
        .then(users => res.json(users))
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Error getting posts" });
        })
    })

    app.listen(8080, () => {
      console.log(`Server running at port 8080`);
    });

  } catch (err) {
    console.log("DB Connection Error");
    // Handle error
    //
  }
}
start().catch(console.dir);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import router from "./routes/postRoute.js";

dotenv.config();

const app = express(); // initialize app

// middleware
app.use(cors()); // mount cors
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
   
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Mount router under "/api"
app.use("/api", router);

// Server root
app.get('/', (req, res) => {
  res.json({ message: 'Server running at port 8080' });
})

async function start() {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("DB Connection Successful");

    app.listen(8080, () => {
      console.log(`Server running at port 8080`);
    });

  } catch (err) {
    console.log("DB Connection Error");
  }
}
start().catch(console.error);
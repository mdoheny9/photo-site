import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkToken = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log("No token detected")
        return res.status(402).json({ error: "No token detected" });
    }
    try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        req.userId = userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token"});
    }
}
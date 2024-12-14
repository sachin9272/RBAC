import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config()
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json())

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} port ${PORT}`);
    
})
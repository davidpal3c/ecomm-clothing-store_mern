// const express = require("express");

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";             //auth routes
import productRoutes from "./routes/product.route.js";       //product routes
import cartRoutes from "./routes/cart.route.js";           //cart routes

import { connectDB } from "./lib/db.js";                    //db
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5051;

app.use(express.json());            //allows to parse the body of the request
app.use(cookieParser());

//authentication routes
app.use("/api/auth", authRoutes)                //http://localhost:5055/api/auth/signup
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});


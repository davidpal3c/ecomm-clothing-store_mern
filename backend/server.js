// const express = require("express");

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5055;

// const PORT = process.env.PORT; 

console.log(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
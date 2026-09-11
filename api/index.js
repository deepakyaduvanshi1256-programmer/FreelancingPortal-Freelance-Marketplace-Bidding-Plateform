import 'dotenv/config'
import express from  'express'
import cors from 'cors'
import mongoose from 'mongoose';
import router from './router/router.js';
import dbconnect from './config/db.js';
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
dbconnect()
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
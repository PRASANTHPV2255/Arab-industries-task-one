const express=require('express')
const dotenv=require('dotenv');
const connect = require('./Database');
const router = require('./TestRouter');

const app=express();

connect();
app.use(express.json());
dotenv.config();

app.get('/',(req,res)=>{
    res.json("api is running")
})
app.use('/',router);

const PORT=5000;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))


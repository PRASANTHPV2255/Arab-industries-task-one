const mongoose=require('mongoose');

const connect=async()=>{

    const conn=await mongoose.connect("mongodb+srv://Prasanth007:Prasanthpv3012345@prasanth.bzikmtz.mongodb.net/Arabtask?retryWrites=true&w=majority").then(()=>{
        console.log("Database connected");
    }).catch((err)=>console.log("connection error"))
   
}
module.exports=connect; 
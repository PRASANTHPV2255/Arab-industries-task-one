const reg = require("../Schema/Register");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const express=require('express')
const app=express();


const register=async(req,res)=>{
    const {Name,Email,Password,Role}=req.body;
    
    const getuser=await reg.findOne({Name})

    if(!Name || !Email || !Password || !Role){
        return res.json({msg:'Fill all the field'})
    }

    if(getuser){
      return  res.json("name already taken")

    } else {
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(Password,salt)

    const newreg=await reg.create({Name,Email,Password:hashpass,Role})

    const Token=gentoken(newreg.Name,newreg.Role)

   if(newreg.Role==true){
   return res.json({msg:"Admin register success",newreg,Token:Token});

   } else {
     res.json({msg:'User register success',newreg,Token:Token});
   }
}
}

//---Login

const login=async(req,res)=>{

    const {Name,Password}=req.body;

    const finduser=await reg.findOne({Name})

    if(finduser && bcrypt.compareSync(Password,finduser.Password) && finduser.Role==true){

     const Token=gentoken(finduser.Name,finduser.Role)

     
      return  res.json({msg:'Admin login success',Token:Token})

 
    } 
    else if(finduser && bcrypt.compareSync(Password,finduser.Password) && finduser.Role==false) {

      const Token=gentoken(finduser.Name,finduser.Role)

      return  res.json({msg:'user login success',Token:Token})

    } else {
       return res.json({msg:'Name and Password is not correct'})
    }
}

const gentoken=(Name,Role)=>{
    return jwt.sign({Name,Role},process.env.JWT_SECRET,{expiresIn:'1h'})
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/protected', authenticateToken, (req, res) => {
  
  res.json({ message: 'Protected data accessed successfully' });
});

module.exports={register,login}
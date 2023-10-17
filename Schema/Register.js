const mongoose=require('mongoose')

const register=mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String},
    Role:{type:Boolean}

})

const reg=mongoose.model('Register one',register);

module.exports=reg; 
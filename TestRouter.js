const express=require('express');
const {register, login} = require('./Controller/Registertion');

const router=express.Router();


router.route('/signup').post(register);
router.route('/login').post(login)


module.exports=router 
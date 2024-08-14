const express=require('express')
const Router=express.Router()
const {Sign_up,Login}=require('../controller/userController')

Router.post('/', Sign_up);

Router.post('/Login',Login);

module.exports=Router
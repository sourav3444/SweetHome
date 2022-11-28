const express = require('express')
const router = express.Router()
const User = require('../models/users')
const mongoose =require('mongoose')

router.get('/',(req,res)=>{
    res.render('pages/admin',{"errmsg":null})
})
router.post('/',(req,res)=>{
    var username = req.body.adminUsername
    var password = req.body.adminPassword
    if(username =="admin" && password =="admin"){
        res.redirect('admin/control')
    }else{
        res.render('pages/admin',{"errmsg":"You Are Not Admin"});
    }
})
router.get("/control",(req,res)=>{
    var data = null
    res.render("pages/admin_control",{data:data});
})
router.post("/control",async(req,res)=>{
    try {
        const data = await User.find({})
        res.render("pages/admin_control",{data:data})
    } catch (error) {
        throw error;
    }
})

module.exports = router
const express = require('express')
const router = express.Router();
const User = require('../models/users');


router.get('/',function(req,res){
    res.render('index')
})
router.get('/about',function(req,res){
    res.render('pages/about')
})
router.get('/buy',function(req,res){
    res.send("You are in buyer page.")       
    
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/users')
const mongoose =require('mongoose')
const jwt = require('jsonwebtoken')


var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/register',(req,res)=>{
    res.render('pages/register',{"msg":null})
})

router.get('/login',(req,res)=>{
    res.render('pages/login',{"msg":null,"wlcmsg":null,"notfound":null,"errmsg":null})
})
 router.get("/profile",(req,res)=>{
    res.render("pages/user_profile")
})
router.post('/register',(req,res)=>{

    var userData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    User.findOne({
        email:req.body.email
    }).then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                userData.password = hash
                User.create(userData).then((user)=>{
                    res.render('pages/login',{"notfound":null,"errmsg":null})
                }).catch(err=>{
                    res.send("error" + err)
                })
            })
        }else{
            res.render("pages/register",{"msg":"User Already exist"})
        }
    }).catch(err=>{
        throw err;
    })

})

router.post('/login',(req, res)=> {

    var loginData ={
        email:req.body.email,
        password:req.body.password
    }
    User.findOne({email:req.body.email}).then((user)=>{
        if (user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                    const payload = {
                        _id:user._id,
                        username:user.username,
                        email:user.email
                    }
                    let token = jwt.sign(payload,process.env.SECRET_KEY,{
                        expiresIn:1440
                    })
                    res.render("pages/user_profile",{"wlcmsg":user.username})
                    // res.send(token)
                }else{
                    res.render('pages/login',{"errmsg":"Password did't match!"})
                    // res.json({error:"user does not exist"})
                }
         }else{
             res.render("pages/login",{"notfound":"user does not exist ","errmsg":null})
         }
     }).catch(err=>{
         throw err;
     })
});

module.exports = router;

if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
    }

const express = require('express');
const path = require('path');
const ejs=require('ejs')
const bodyParser=require('body-parser');
const IndexRouter=require('./routes/index')
const UserRouter = require('./routes/Users')
const AdminRouter = require('./routes/admin')
const mongoose = require('mongoose');
const app = express();

app.set('views',__dirname + "/views")
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))
//handeling routes
app.use('/',IndexRouter)
app.use('/user',UserRouter)
app.use('/admin',AdminRouter)


//handeling database
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  }).then(()=>{
    console.log("connected successfull")
  }).catch((err)=>{
    console.log(err);
  })
  const db = mongoose.connection
  db.on('error',()=>{throw error})
  db.once('open',()=>{
      console.log("connected successfully")
  })


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000");
});



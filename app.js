const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const db = require('./model/db');
console.log("hiii")
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
 
db.start.connect(function(err) {
    if(err) {
      console.log('Error connecting to the database');
    } else {
      console.log('Connected to MYSQL');
    }
  });


// app.get("/",(req,res)=>{

//    // res.send("<h1>Home page </h1>");
//    res.render("index");//it is looking in views
// });
// app.get("/cregister",(req,res)=>{

//    // res.send("<h1>Home page </h1>");
//    res.render("cregister");//it is looking in views
// });


//define routes
app.use(express.static('views/images')); 

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


app.listen(5000,()=>{
    console.log("server started at 5000");
})
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/thapa").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("No connection");
});



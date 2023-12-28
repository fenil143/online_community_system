const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bhavik_patel:Svsm4142@bhavik.eknxbqt.mongodb.net/").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("No connection");
});



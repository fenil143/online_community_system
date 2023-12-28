const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://fenil:Svsm4142@ocms.ggujxsk.mongodb.net/Online_Community_System").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("No connection");
});



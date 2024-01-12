const mongoose = require('mongoose');
// mongodb://localhost:27017/
// mongodb+srv://fenil:Svsm4142@ocms.ggujxsk.mongodb.net/Online_Community_System
mongoose.connect("mongodb://localhost:27017/online_community_system").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("No connection");
});
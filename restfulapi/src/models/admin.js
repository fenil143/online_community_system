const mongoose=require("mongoose");

const admin = mongoose.Schema({
    admin_id: String,
    admin_password: String,
});
module.exports=mongoose.model("Admin",admin);
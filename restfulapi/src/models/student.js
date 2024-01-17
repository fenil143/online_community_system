const mongoose=require("mongoose");

const student = mongoose.Schema({
    name:String,
    email:String,
    password: String,
    qualification: String,
    resume: String,
    image: String,
    status: { type: Boolean, default: false },
    pending_community_id : mongoose.Schema.Types.Mixed,
    joined_community_id: mongoose.Schema.Types.Mixed,
    created_community_id : mongoose.Schema.Types.Mixed,
});
module.exports=mongoose.model("Student",student);
const mongoose=require("mongoose");
const student_info=mongoose.Schema({
    email:String,
    experince:String,
    cpi:String,
    skill:[String],
    linkedin_link:String,
    college:String,
    graduation_year:String,
    qualification:String,
    github_link:String,
    description:String,
    starting_date:String,
    university:String,
    field:String,
    ending_date:String,
    hobbies:String,
    working_location:String
});
module.exports=mongoose.model("StudentInfo",student_info);
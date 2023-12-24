const express = require('express');
const router = express.Router();
const Admin = require("../../models/admin")

router.post("/test",async (req,res) =>{
    // res.write("<p>Hello i am raj modi</p>")
    const id = req.body.admin_id;
    const pass = req.body.admin_password;
    console.log(id);
    console.log(pass);
    try{
        const temp = await Admin.find();
        // console.log(temp);
        const ans = await Admin.find({admin_id:id,admin_password:pass});
        // console.log(ans.length);
        if(ans.length > 0){
            res.json({correct : true})
        }
        else{
            res.json({correct : false})
        }
    }
    catch(err){
        res.json({error : err})
    }
});

module.exports = router;
const express = require("express");
require("./db/conn");
// const Student = require("./models/students");

const studentApi = require("./routers/student/api");
const communityApi = require("./routers/community/api");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(cors({
    origin:"http://localhost:8000"
}
));
app.use(studentApi);
app.use(communityApi);
// app.get("/students",(req,res) =>{
//     res.send("Hello world hello ")
// })
// // app.use("studentApi",studentApi);
// app.post("/students", (req,res)=>{
//     // res.send("Hello from the other sides");
//     console.log(req.body.name);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.send(user);
//     }).catch((e)=>{
//         res.send(e);
//     });
// })

app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
});
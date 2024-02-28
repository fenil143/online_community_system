const express = require("express");
require("./db/conn");

const studentApi = require("./routers/student/api");
const communityApi = require("./routers/community/api");
const eventApi = require("./routers/event/api");
const postApi = require("./routers/post/api");
const commentApi = require("./routers/comment/api");
const adminApi = require("./routers/admin/api");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/loading",async(req,res)=>{
    res.send("server is running")
 })
app.use(studentApi);
app.use(communityApi);
app.use(eventApi);
app.use(postApi);
app.use(commentApi);
app.use(adminApi);


app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
});
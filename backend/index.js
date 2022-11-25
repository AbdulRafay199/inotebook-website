const connecttomongo = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// app.get('/', (req,res)=>{
//     res.send("api is working")
// })

app.use('/api/auth', require("./Routes/auth"));
app.use('/api/note', require("./Routes/note"));

app.listen(port, ()=>{
    console.log(`inotebook app is working at http://localhost:${port}`)
})
connecttomongo();
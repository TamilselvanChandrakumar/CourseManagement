const express=require("express"); 
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const taskroutes=require('./routes/taskroute');
const mongoose=require("mongoose");
const cors=require('cors');

//using middleware
app.use((req,res,next)=>{
    console.log('path'+req.path +"metod"+req.method);
    next();
})
app.use(express.json());
app.use(cors());
//  app.get('/',(req,res)=>{
//     res.send('hello program')
//  })
mongoose.connect(process.env.DB).then(()=>{
    console.log("database is connceted");
}).catch(()=>{
    console.log("database is not connceted");
})
app.listen(process.env.PORT,()=>{
    console.log("app listening on port"+process.env.PORT);
})

app.use("/api/tasks",taskroutes);
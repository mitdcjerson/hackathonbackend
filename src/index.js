import express, { request, response } from "express";
import cors from "cors"
const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    return res.json(
        [{
            fake :"Test",
            fact:"Test"
        } 
    ]);
   
});

app.get("/infos",(req,res)=>{
    console.log(req.type);

    return res.json(
        [{
             id: 1,
             type: "type test",
             text: "text test",
             result: "test resut",
             result2: req.type

        } 
    ]);
});


app.post("/infos",(req,res)=>{
    console.log(req.type);
    return res.json(
        [{
             id: 1,
             type: "type test",
             text: "text test",
             result: "test resut",
             result2: req.type

        } 
    ]);
});




 

app.listen(3002,()=>{
    console.log("Port 3002");
});
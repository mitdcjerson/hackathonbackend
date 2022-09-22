import express, { request, response } from "express";
import cors from "cors"
const app=express();
app.use(express.json());
app.use(cors());

const fact = require('../src/Data/fact.json');
const fake = require('../src/Data/fake.json');

 

app.get("/",(req,res)=>{
    let data=[];
    data.push(fact);
    data.push(fake);
    return res.json(data);
   
});

app.get("/infos",(req,res)=>{
    let data=[];
        if(req.query.type==1){
            data.push(fact);
        }
        else if (req.query.type==0){
            data.push(fake);
        }
        else{
            data.push(fact);
            data.push(fact);
        }
    
    
    return res.json(data);
});


app.post("/infos",(req,res)=>{
    console.log(req);
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
import express, { request, response } from "express";
import cors from "cors"
const app=express();
app.use(express.json());
app.use(cors());

const fact = require('../src/Data/fact.json');
const fake = require('../src/Data/fake.json');
const userinfo =require('../src/Data/user.json')
 

 

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
            data.push(fake);
        }
    
    
    return res.json(data);
});


app.post("/infos",(req,res)=>{
 console.log("Result " + req.body.text  +" -- " + req.body.type)
    let newData=[
        { "text": req.body.text , "result": req.body.type }
    ];

    if(req.body.type==1){
        fact.push(newData);
    }
    else if (req.body.type==0){
        fake.push(newData);
    }
 

    return res.json(newData);
       
});



app.post("/users",(req,res)=>{
   
 
 let status;
  let jsondata =userinfo.find(c=>c.username==req.body.username && c.password==req.body.password);
    
    if(jsondata==undefined){
       
       status=0;
         
    }
    else{
     
       status=1;
    }
        console.log("Status " ,status);
        
       return res.json(status);
          
   });
   
   
   



 

app.listen(3002,()=>{
    console.log("Port 3002");
});
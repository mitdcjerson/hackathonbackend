import express, { request, response } from "express";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());

const fact = require('../src/Data/fact.json');
const fake = require('../src/Data/fake.json');



app.get("/", (req, res) => {
    let data = [];
    data.push(fact);
    data.push(fake);
    return res.json(data);

});

app.get("/infos", (req, res) => {
    let data = [];
    if (req.query.type == 1) {
        data.push(fact);
    }
    else if (req.query.type == 0) {
        data.push(fake);
    }
    else {
        data.push(fact);
        data.push(fake);
    }


    return res.json(data);
});


app.post("/infos", (req, res) => {

    if (!req.body.text) {
        return res.status(400).json({
            "error": "text not found"
        });
    }

    if (!req.body.result) {
        return res.status(400).json({
            "error": "result not found"
        });
    }
    const info = {
        name: req.body.name,
        result: req.body.result
    };

    if(req.body.type === 0)
    {
        fake.push(info);
    }
    else{
        fact.push(info);
    }

    return res.json(info);
});


app.listen(3002, () => {
    console.log("Port 3002");
});
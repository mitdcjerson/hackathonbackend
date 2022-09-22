import express, { request, response } from "express";
import cors from "cors"
import { suggestIcon, trainModel } from "./suggestions/model";
import * as use from "@tensorflow-models/universal-sentence-encoder"
const app = express();
app.use(express.json());
app.use(cors());

const fact = require('../src/Data/fact.json');
const fake = require('../src/Data/fake.json');
let trainedModel = {};
let sentenceEncoder = {}

app.get("/", (req, res) => {
    let data = [];
    data.push(fact);
    data.push(fake);
  
    loadModel();
    return res.json(data);

});

const loadModel = async () => {
    console.log("loadmodel");
    sentenceEncoder = await use.load();

    trainedModel = await trainModel(sentenceEncoder);
    console.log("loadmodel2");
    sentenceEncoder;

  };

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

    if (!req.body.type) {
        return res.status(400).json({
            "error": "type not found"
        });
    }
    const info = {
        text: req.body.text,
        result: req.body.type
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

app.post("/check", async (req, res) => {

    const threshold = 0.30;
    console.log(req.body.text);
    const predictedIcon = await suggestIcon(trainedModel, sentenceEncoder, req.body.text, threshold);
 
    Promise.all([predictedIcon]);
    console.log(predictedIcon);
    if (predictedIcon === undefined) {
        res.status(404).send();
    }

    return res.json(predictedIcon);
});


app.listen(3002, () => {
    console.log("Port 3002");
});
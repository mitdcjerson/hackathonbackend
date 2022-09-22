import express from "express";
import cors from "cors";
import data from "../data";
import e from "express";
import { suggestIcon, trainModel } from "./suggestions/model";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/check/:text", (req,res) => {

    const threshold = 0.50;
    const predictedIcon = suggestIcon(model, encoder, taskName, threshold);

    if(predictedIcon === undefined){
        res.status(404).send();
    }

    return predictedIcon;
});
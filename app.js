import bodyParser from "body-parser";
import express from "express";
import { handler } from "./handler.js";
import { resort } from "./resort.js";

export const root = process.env.MEGA_ROOT || "sort";
export const nude = process.env.MEGA_NUDE || "http://localhost:3000/sync";
export const pres = process.env.MEGA_PRES || 0.3;

const app = express();


app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", handler(root, nude, pres));
app.post("/sort", (req, res) => {
    resort(root, pres, nude);
    res.sendStatus(200);
});

app.listen(8080, () => console.log("Listening on 8080!"));
import bodyParser from "body-parser";
import express from "express";
import { handler } from "./handler.js";

const root = process.env.MEGA_ROOT || "sort";
const nude = process.env.MEGA_NUDE || "http://localhost:3000/sync";
const pres = process.env.MEGA_PRES || 0.3;

const app = express();


app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", handler(root, nude, pres));

app.listen(8080, () => console.log("Listening on 8080!"));
import bodyParser from "body-parser";
import express from "express";
import { handler } from "./handler.js";

const app = express();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", handler);

app.listen(3000, () => console.log("Listening on 3000!"));
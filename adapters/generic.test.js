import { generic } from "./generic.js";
import fs from 'fs';

const writeToFile = async () => {
    const [stream, ext] = await generic("https://i.redd.it/i6n0ggryjof81.jpg", []);
    const file = fs.createWriteStream("file."+ext);
    stream.pipe(file);
}

writeToFile();
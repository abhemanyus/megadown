import { reddit } from "./reddit.js";
import fs from 'fs';

const writeToFile = async () => {
    const url = new URL("https://www.reddit.com/r/Art/comments/sjrhkv/end_of_romance_ant%C3%B4nio_parreiras_oil_on_canvas/")
    const [stream, ext] = await reddit(url);
    const file = fs.createWriteStream("file."+ext);
    stream.pipe(file);
}

writeToFile();
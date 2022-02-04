import { pixiv } from "./pixiv.js";
import fs from 'fs';

const writeToFile = async () => {
    const url = new URL("https://www.pixiv.net/en/artworks/93392275")
    const [stream, ext] = await pixiv(url);
    const file = fs.createWriteStream("file."+ext);
    stream.pipe(file);
}

writeToFile();
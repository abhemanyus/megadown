import { danbooru } from "./danbooru.js";
import fs from 'fs';

const writeToFile = async () => {
    const url = new URL("https://danbooru.donmai.us/posts/5108729")
    const [stream, ext] = await danbooru(url);
    const file = fs.createWriteStream("file."+ext);
    stream.pipe(file);
}

writeToFile();
import { classify } from "./classify.js";
import fs from 'fs';


async function main () {
    const fileStream = fs.readFileSync("test/pixiv.jpg");
    const result = await classify(fileStream);
    console.log(result);
}

main()
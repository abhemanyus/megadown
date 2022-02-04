import { streamToBuffer } from "./streamToBuffer.js";
import fs from 'fs';

const file = "test/random.jpg";

const main = async (file) => {
    const fileStream = fs.createReadStream(file);
    const buffer = await streamToBuffer(fileStream);
    console.log(buffer.length);
}

main(file);

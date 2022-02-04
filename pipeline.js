import { classify } from "./classify.js";
import { urlToStream } from "./urlToStream.js";
import { streamToBuffer } from "./streamToBuffer.js";
import nodeImageHash from "node-image-hash";
import fs from 'fs';
import path from "path";

export const process = async (url, precision = 0.3, root = "base") => {
    const [stream, ext] = await urlToStream(url);
    const buffer = await streamToBuffer(stream);
    const result = await classify(buffer);
    const { hash } = await nodeImageHash.hash(buffer, 8, 'hex');
    console.log(hash, result);
    const filepath = path.join(root, result, hash + '.' + ext);
    if (fs.existsSync(filepath)) {
        console.log("file exists")
        const existFile = fs.statSync(filepath);
        if (existFile.size >= buffer.length) {
            console.log("kept original")
            return (result + " " + Math.round(buffer.length/1000) + "kb");
        }
    }
    fs.writeFile(filepath, buffer, (err) => {
        err && console.error(err)
    });
    return (result + " " + Math.round(buffer.length/1000) + "kb");
}
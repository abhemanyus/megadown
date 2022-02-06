import { classify } from "./classify.js";
import { urlToStream } from "./urlToStream.js";
import { streamToBuffer } from "./streamToBuffer.js";
import nodeImageHash from "node-image-hash";
import fs from 'fs';
import path from "path";

export const process = async (url, root = "base", nude, precision) => {
    const [stream, ext] = await urlToStream(url);
    const buffer = await streamToBuffer(stream);
    const result = await classify(buffer, precision, nude);
    const { hash } = nodeImageHash.syncHash(buffer, 8, 'hex');
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
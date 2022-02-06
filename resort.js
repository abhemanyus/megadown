import { classify } from "./classify.js";

import fs from 'fs';
import path from "path";
import nodeImageHash from "node-image-hash";

const isImage = (name) => {
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    const match = regex.exec(name)
    if (match[1]) {
        return match[1];
    }
    return null
}

let PATHS = {};
let pres = 0;
let nude = null;

const processFile = folder => async(file) => {
    const ext = isImage(file);
    if (!ext) {
        return;
    }
    try {
        const prevPath = path.join(folder, file);
        const fileBuffer = fs.readFileSync(prevPath);
        const result = await classify(fileBuffer, pres, nude);
        const {hash} = await nodeImageHash.hash(fileBuffer, 8, 'hex');
        const newPath = path.join(PATHS[result], hash + "." + ext);
        fs.renameSync(prevPath, newPath);
    } catch (error) {
        console.log(error)
    }
}

const processFolder = async (folder) => {
    const files = fs.readdirSync(folder);
    const folderFile = processFile(folder);
    await Promise.all(files.map(folderFile));
}

export const resort = async (root, precision, nudeNet) => {
    PATHS = {
        safe: path.join(root, "safe"),
        unsafe: path.join(root, "unsafe"),
        fuzzy: path.join(root, "fuzzy")
    }
    pres = precision;
    nude = nudeNet;
    await Promise.all(Object.values(PATHS).map(processFolder));
    console.log('Re-Sort done!');
}
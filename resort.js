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

const processFile = folder => async (file) => {
    const ext = isImage(file);
    if (!ext) {
        return;
    }
    try {
        const prevPath = path.join(folder, file);
        const fileBuffer = fs.readFileSync(prevPath);
        const result = await classify(fileBuffer, pres, nude);
        const { hash } = await nodeImageHash.syncHash(fileBuffer, 8, 'hex');
        const newPath = path.join(PATHS[result], hash + "." + ext);
        fs.renameSync(prevPath, newPath);
    } catch (error) {
        console.log(error)
    }
}

const processFolder = async (folder, files = []) => {
    const folderFile = processFile(folder);
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        await folderFile(file);
    }
}

export const resort = async (root, precision, nudeNet) => {
    PATHS = {
        safe: path.join(root, "safe"),
        unsafe: path.join(root, "unsafe"),
        fuzzy: path.join(root, "fuzzy")
    }

    nude = nudeNet
    pres = precision

    const safeFiles = fs.readdirSync(PATHS.safe);
    const unsafeFiles = fs.readdirSync(PATHS.unsafe);
    const fuzzyFiles = fs.readdirSync(PATHS.fuzzy);

    await processFolder(PATHS.safe, safeFiles);
    console.log("Safe done!");
    await processFolder(PATHS.unsafe, unsafeFiles);
    console.log("Un-Safe done!");
    await processFolder(PATHS.fuzzy, fuzzyFiles);
    console.log("Fuzzy done!");

    console.log('Re-Sort done!');
}
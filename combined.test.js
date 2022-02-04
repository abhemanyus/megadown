import { classify } from "./classify.js";
import { urlToStream } from "./urlToStream.js";
import { streamToBuffer } from "./streamToBuffer.js";
import nodeImageHash from "node-image-hash";
import fs from 'fs';

const urlList = [
    ["reddit", "https://www.reddit.com/r/Art/comments/sjrhkv/end_of_romance_ant%C3%B4nio_parreiras_oil_on_canvas/"],
    ["redditDirect", "https://i.redd.it/mwj39dl62of81.png"],
    ["random", "https://www.thesprucepets.com/thmb/AlsaZ1vMyplHqJkbe-iKeyzJwRY=/4368x2912/filters:fill(auto,1)/burmese-cat-love-85151671-5c87d723c9e77c0001a3e5ae.jpg"],
    ["pixiv", "https://www.pixiv.net/en/artworks/88266745"]
]

const classifyUrl = async (name, url) => {
    const [stream, ext] = await urlToStream(url);
    const buffer = await streamToBuffer(stream);
    const result = await classify(buffer);
    const hash = await nodeImageHash.hash(buffer, 8, 'hex');
    console.log(name, result, hash.hash);
    fs.writeFile("tmp/"+name+"."+ext, buffer, (err) => {
        err && console.error(err)
    });
}

async function main() {
    await Promise.all(urlList.map(item => classifyUrl(item[0], item[1])));
    nodeImageHash.close();
}

main()
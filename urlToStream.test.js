import { urlToStream } from "./urlToStream.js";
import fs from 'fs';

const writeToFile = async (url, name) => {
    const imgURL = new URL(url)
    const [stream, ext] = await urlToStream(imgURL);
    const file = fs.createWriteStream("test/"+name+"."+ext);
    stream.pipe(file);
}

const urlList = [
    ["reddit", "https://www.reddit.com/r/Art/comments/sjrhkv/end_of_romance_ant%C3%B4nio_parreiras_oil_on_canvas/"],
    ["redditDirect", "https://i.redd.it/mwj39dl62of81.png"],
    ["random", "https://www.thesprucepets.com/thmb/AlsaZ1vMyplHqJkbe-iKeyzJwRY=/4368x2912/filters:fill(auto,1)/burmese-cat-love-85151671-5c87d723c9e77c0001a3e5ae.jpg"],
    ["pixiv", "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=81680979"]
]

urlList.forEach(item => writeToFile(item[1], item[0]));
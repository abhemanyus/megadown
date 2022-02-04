import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { generic } from "./generic.js";

export const pixHeaders = [
    {
        "name": "Accept",
        "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/jxl,image/webp,*/*;q=0.8"
    },
    {
        "name": "Accept-Encoding",
        "value": "gzip, deflate, br"
    },
    {
        "name": "Accept-Language",
        "value": "en-US,en;q=0.5"
    },
    {
        "name": "Cache-Control",
        "value": "max-age=0"
    },
    {
        "name": "Connection",
        "value": "keep-alive"
    },
    {
        "name": "DNT",
        "value": "1"
    },
    {
        "name": "Host",
        "value": "i.pximg.net"
    },
    {
        "name": "Referer",
        "value": "https://www.pixiv.net/"
    },
    {
        "name": "Sec-Fetch-Dest",
        "value": "document"
    },
    {
        "name": "Sec-Fetch-Mode",
        "value": "navigate"
    },
    {
        "name": "Sec-Fetch-Site",
        "value": "cross-site"
    },
    {
        "name": "Sec-Fetch-User",
        "value": "?1"
    },
    {
        "name": "TE",
        "value": "trailers"
    },
    {
        "name": "Upgrade-Insecure-Requests",
        "value": "1"
    },
    {
        "name": "User-Agent",
        "value": "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0 Waterfox/91.5.0"
    }
];

export const pixiv = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const { document } = (new JSDOM(html)).window;
    const meta = document.querySelector("#meta-preload-data").content
    const data = JSON.parse(meta);
    const illust = data.illust[Object.keys(data.illust)[0]];
    const imgURL = illust["urls"]["original"];
    const streamExt = await generic(imgURL, pixHeaders);
    return streamExt;
}
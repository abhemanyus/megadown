import fetch from "node-fetch";
import { generic } from "./generic.js";

export const redHeaders = [
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
        "value": "i.redd.it"
    },
    {
        "name": "If-None-Match",
        "value": "\"0090c94b8112e2cd61ad222af05331ea\""
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
]

export const reddit = async (url) => {
    const response = await fetch(url.origin + url.pathname.substring(0, url.pathname.length - 1) + ".json");
    const data = await response.json();
    const imgURL = data[0].data.children[0].data.url;
    const streamExt = await generic(imgURL, redHeaders);
    return streamExt;
}

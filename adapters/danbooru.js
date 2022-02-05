import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { generic } from "./generic.js";

export const danHeaders = [
    {
        "name": "Accept",
        "value": "image/avif,image/jxl,image/webp,*/*"
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
        "name": "Alt-Used",
        "value": "cdn.donmai.us"
    },
    {
        "name": "Connection",
        "value": "keep-alive"
    },
    {
        "name": "Cookie",
        "value": "_danbooru2_session=SSQjguKF2LZZcBUQT9qZOV%2FYdVPEgEvv4Ow1cvgSBQ9JKvwMQ82qgBpIiPapF5ndfgrR3rRtgdHMzdNfJM8Ahuhp2Ei9Cqr72F%2FLBvhrgjWFEGMtVy1jnsMMLSohSIFu4yzqlDsTGI8m7hqikWEJL%2BYzflwI1I0kGIX%2BaerWYqfcB0gtFbB8KLIRUvkEHth8qJExjJglDkqcJupo2sIPObrKqwjIrsgIS0gh4OD1dH3Xie1TAe5RbQuHgnrTX9ue7aSMuXg1uK771JlQHr%2FuZieAQSYGZisoDyPkmlX2DJOm4OGvp8Or3rfA3z759wm87VVRXPWuLU23DoRNYFpQjglUjf0G6IjJhRpZvjeLsD0qXU3UZ1UJkIP1XfwPYjxL%2FbDKnA%3D%3D--911hxeFsOlNhTsvH--ZTIVQn1g1ntgbRrK2ab8fw%3D%3D"
    },
    {
        "name": "DNT",
        "value": "1"
    },
    {
        "name": "Host",
        "value": "cdn.donmai.us"
    },
    {
        "name": "Referer",
        "value": "https://danbooru.donmai.us/"
    },
    {
        "name": "Sec-Fetch-Dest",
        "value": "image"
    },
    {
        "name": "Sec-Fetch-Mode",
        "value": "no-cors"
    },
    {
        "name": "Sec-Fetch-Site",
        "value": "same-site"
    },
    {
        "name": "User-Agent",
        "value": "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0 Waterfox/91.5.0"
    }
];

export const danbooru = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const { document } = (new JSDOM(html)).window;
    const imgURL = document.querySelector(".image-view-original-link").href
    const streamExt = await generic(imgURL, danHeaders);
    return streamExt;
}
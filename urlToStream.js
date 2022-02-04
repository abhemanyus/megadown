import { reddit, redHeaders } from "./adapters/reddit.js";
import { pixiv, pixHeaders } from "./adapters/pixiv.js";
import { generic } from "./adapters/generic.js";

const nameToAdapter = {
    'reddit': [reddit, redHeaders],
    'pixiv': [pixiv, pixHeaders]
}


const checkImage = (name) => {
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    return regex.exec(name)
}

export const urlToStream = async (urlString) => {
    const url = new URL(urlString)
    const tokens = url.hostname.split('.')
    const name = tokens[tokens.length - 2]
    const isImg = checkImage(url.pathname)
    const adapter = nameToAdapter[name]
    let streamExt = [];
    if (adapter && isImg) {
        streamExt = await generic(url, adapter[1])
    }
    else if (!adapter && isImg) {
        streamExt = await generic(url, [])
    }
    else if (adapter && !isImg) {
        streamExt = await adapter[0](url)
    }
    return streamExt
}
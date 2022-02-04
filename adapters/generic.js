import fetch from "node-fetch"

const getExt = (url) => {
    const urlObj = new URL(url)
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    const matches = regex.exec(urlObj.pathname)
    if (matches) {
        return matches[1]
    }
    return null
}

export const generic = async (url, headers) => {
    const headerDict = {};
    headers.forEach(header => {
        headerDict[header["name"]] = header["value"]
    })
    const response = await fetch(url, { headers: headerDict });
    const stream = response.body;
    return [stream, getExt(url)];
}


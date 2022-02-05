import { process } from "./pipeline.js";
export const handler = (root, nude, precision) => async (req, res) => {
    const {url} = req.body
    let result = "undefined"
    try {
        result = await process(url, root, nude, precision)
    } catch (error) {
        console.log(error)
    }    
    res.send(result);
}
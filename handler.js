import { process } from "./pipeline.js";
export const handler = async (req, res) => {
    const {url} = req.body
    let result = "undefined"
    try {
        result = await process(url)
    } catch (error) {
        console.log(error)
    }    
    res.send(result);
}
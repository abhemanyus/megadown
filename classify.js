import fetch from "node-fetch";

export const classify = async (buffer, precision = 0.3, nudeNet = "http://localhost:8080/sync") => {

    const base64 = buffer.toString("base64");

    const response = await fetch(nudeNet, {
        method: "POST",
        body: JSON.stringify({
            data: {
                file: base64
            }
        }),
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await response.json();

    if (data.success) {
        const { safe, unsafe } = data.prediction.file;
        const dist = Math.abs(safe-unsafe);
        if (dist < precision) {
            return "fuzzy";
        }
        else if (safe > unsafe) {
            return "safe";
        }
        else {
            return "unsafe";
        }
    }

    return false;
}
export const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = []
        stream.once('error', (err) => {
            reject(err);
        })
        stream.once('end', () => {
            resolve(Buffer.concat(chunks));
        })
        stream.on('data', (chunk) => {
            chunks.push(chunk);
        })
    })
}
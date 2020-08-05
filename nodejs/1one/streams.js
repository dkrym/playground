const fs = require('fs');

const readStream = fs.createReadStream('./res/text3.txt', { encoding: 'utf8' });
// const writeStream = fs.createWriteStream('./res/text4.txt');
const writeStream = fs.createWriteStream('./res/text5.txt');

// readStream.on('data', (chunk) => {
//     console.log("----------- CHUNK -----------");
//     console.log(chunk);
//     writeStream.write(chunk);
// })

// pipe
readStream.pipe(writeStream);
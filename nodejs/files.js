const fs = require('fs');

// read file
// fs.readFile('./res/text.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// })

// console.log('last line to prove readFile is async and is done later than last line of code')

// write file
// fs.writeFile('./res/text2.txt', "I will overwrite any text", () => {
//     console.log("File has been written")
// })

// directories
// if (!fs.existsSync('./res/newfolder')) {
//     fs.mkdir('./res/newfolder', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Folder created");
//     })
// } else { // folder already exists
//     fs.rmdir('./res/newfolder', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("folder deleted");
//     })
// }


// deleting
if (fs.existsSync('./res/deleteme.txt')) {
    fs.unlink('./res/deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log("file deleted");
    })
}
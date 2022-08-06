const fs = require('fs');
const readline = require('readline');

const readLastLines = (filename) => {
    return new Promise((resolve, reject) => {
        let logs = []
        var r1 = readline.createInterface({
            input: fs.createReadStream(filename),
            output: process.stdout,
            terminal: false
        });

        r1.on('line', input => {
            console.log(input)
            logs.push(input)
        });

        r1.on('error', error => {
            reject(error)
        })

        r1.on('close', () => {
            lastline = logs.length > 0 ? logs[logs.length - 1] : '';
            resolve(logs.slice(-10));
        })
    })

}


const readNewLines = (filename) => {
    return new Promise((resolve, reject) => {
        let logs = []
        var r1 = readline.createInterface({
            input: fs.createReadStream(filename),
            output: process.stdout,
            terminal: false
        });

        r1.on('line', input => {
            console.log('new line - ', input)
            logs.push(input)
        });

        r1.on('error', error => {
            reject(error)
        })

        r1.on('close', () => {
            lastline = logs.length > 0 ? logs[logs.length - 1] : '';
            resolve(logs);
        })
    })

}



module.exports = { readLastLines, readNewLines }
const http = require('http');
const fs = require('fs');
const webSocketServer = require('websocket').server;
const readLastLines = require('./utils.js').readLastLines;
const readNewLines = require('./utils.js').readNewLines;


const LOGFILE = "logfile"
let connections = []

const server = http.createServer(function (req, res) {
    if (req.url == '/log') {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                console.error(err.message)
                res.end();
            }
            else {
                res.write(data);
                res.end();
            }
        })
    }
})

server.listen(8080, () => {
    console.log('Node.js web server at port 8080 is running..');
})

wss = new webSocketServer({
    httpServer: server
})

wss.on('request', function (request) {
    connections.push(request.accept(null, request.origin));
});

wss.on('connect', connection => {
    readLastLines(LOGFILE)
        .then(logs => {
            connection.send(JSON.stringify({ filename: LOGFILE, logs: logs }));
        })

    connection.on('close', connection => {
        console.log(connection)
    })
})


fs.watchFile(LOGFILE, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        readNewLines(LOGFILE)
            .then(logs => {
                if (logs.length > 0) {
                    connections.forEach(connection => {
                        connection.send(JSON.stringify({ filename: LOGFILE, logs: logs }));

                    })
                }
            })
    }
})
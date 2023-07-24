const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const ChannelManager = require('./channels.js');

const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();
const channels = new ChannelManager();

wss.on('connection', (ws) => {
    ws.isAlive = true;

    const id = uuidv4();
    const metadata = { id };

    clients.set(ws, metadata);

    channels.channel('_everyone').subscribe(ws);
    console.log(channels.channel('_everyone').count());

    ws.on('message', (messageAsString) => {
        const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);

        if (message.action == 'subscribe') {
            if (message.event) {
                channels.channel(message.channel).event(message.event).subscribe(ws);
            } else {
                channels.channel(message.channel).subscribe(ws);
            }
        }

        if (message.action == 'unsubscribe') {
            if (message.event) {
                channels.channel(message.channel).event(message.event).unsubscribe(ws);
            } else {
                channels.channel(message.channel).unsubscribe(ws);
            }
        }

        message.sender = metadata.id;

        [...clients.keys()].forEach((client) => {
            client.send(JSON.stringify(message));
        });
    });

    ws.on('close', (code) => {
        clients.delete(ws);
        channels.unsubscribe(ws);
        console.log(channels.channel('_everyone').count());
    });

    ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

wss.on('close', function close() {
    clearInterval(interval);
});

function heartbeat() {
  this.isAlive = true;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * API
 */
http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello World!');
    // res.end();

    // res.end(req.url);

    // if (req.method != 'POST') {
    //     res.statusCode = 405;
    //     res.end(JSON.stringify({ error: true, message: 'Method not allowed' }));
    //     return;
    // }

    if (req.url == '/favicon.ico') {
        res.statusCode = 404;
        res.end();
        return;
    }

    const section = req.url.replace(/(^\/+|\/+$)/g, '').split('/');
    // console.log(section);

    console.log(req.method, req.url, section.join(', '));
    let body = '';
    req.on('data', (chunk) => {
            body += chunk;
    });
    req.on('end', () => {
        // [...clients.keys()].forEach((client) => {
        //     client.send('ping');
        // });

        // const message = JSON.parse(body ? body : '{}');
        // console.log(body);

        if (section.length) {
            if (section.length > 1) {
                channels
                    .channel(section[0])
                    .event(section[1])
                    .publish({ channel: section[0], event: section[1] });
            } else {
                channels
                    .channel(section[0])
                    .publish({ channel: section[0] });
            }
        }

        [...clients.keys()].forEach((client) => {
            client.send(JSON.stringify(channels.subs(client)));
        });

        res.write(JSON.stringify({ status: 200 }));
        res.end();

    });

}).listen(7072);

/**
 * Webserver
 */
http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('./index.html', function(error, content) {
            if (error) {
                res.statusCode = 404;
                res.end();
                return;
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    } else {
        res.statusCode = 404;
        res.end();
        return;
    }
}).listen(7073);

console.log('websocket server running on port', 7071);
console.log('api running on port', 7072);
console.log('webserver running on port', 7073);

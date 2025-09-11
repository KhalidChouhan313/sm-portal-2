const compression = require('compression')
const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require("fs");

const app = express()
app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/taxi-messages'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/taxi-messages/index.html'));
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/app.taximessages.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/app.taximessages.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/app.taximessages.com/chain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const privateKey2 = fs.readFileSync('/etc/letsencrypt/live/revuus.net/privkey.pem', 'utf8');
const certificate2 = fs.readFileSync('/etc/letsencrypt/live/revuus.net/cert.pem', 'utf8');
const ca2 = fs.readFileSync('/etc/letsencrypt/live/revuus.net/chain.pem', 'utf8');
const credentials2 = {
    key: privateKey2,
    cert: certificate2,
    ca: ca2
};

// console.log(credentials2);
const httpsServer = https.createServer(credentials2, app);
httpsServer.addContext('app.taximessages.com', credentials)
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

// const port = process.env.PORT || '3000';
// app.set('port',port);

// const server = http.createServer(app)
// // Start the app by listening on the default Heroku port
// server.listen(port, () => console.log('Running...'));
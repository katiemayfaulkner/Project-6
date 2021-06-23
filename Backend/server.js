const http = require('http');

const server = http.createServer((req, res) => {
    res.end('voici la reponse du serveur'); // if you change this, to display changes, rerun node server (use nodemonn server to avoid this)//
});

server.listen(process.env.PORT || 3000);
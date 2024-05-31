const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    //* Handling GET request for the root path '/'
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    //* Handling GET request for reading a file
    } else if (req.method === 'GET' && req.url.startsWith('/read')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const fileName = url.searchParams.get('fileName');

        if (!fileName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('File name is required');
            return;
        }

        const filePath = path.join(__dirname, fileName);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    //* Handling POST request for creating a file
    } else if (req.method === 'POST' && req.url === '/create') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { fileName, fileContent } = JSON.parse(body);

            if (!fileName) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('File name is required');
                return;
            }

            const filePath = path.join(__dirname, fileName);
            fs.writeFile(filePath, fileContent, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File created successfully');
            });
        });
    //* Handling POST request for deleting a file
    } else if (req.method === 'POST' && req.url === '/delete') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { fileName } = JSON.parse(body);

            if (!fileName) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('File name is required');
                return;
            }

            const filePath = path.join(__dirname, fileName);
            fs.unlink(filePath, err => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File deleted successfully');
            });
        });
    //* Handling GET request for the 'script.js' file
    } else if (req.method === 'GET' && req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the directory where files will be managed
const fileDirectory = path.join(__dirname, 'files');

// Ensure the directory exists
if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory);
}

// Function to create a file
const createFile = (fileName, content) => {
    const filePath = path.join(fileDirectory, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
};

// Function to read a file
const readFile = (fileName) => {
    const filePath = path.join(fileDirectory, fileName);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    } else {
        return 'File not found';
    }
};

// Function to delete a file
const deleteFile = (fileName) => {
    const filePath = path.join(fileDirectory, fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return 'File deleted';
    } else {
        return 'File not found';
    }
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/') {
        // Serve the HTML file
        const htmlFilePath = path.join(__dirname, 'index.html');
        fs.readFile(htmlFilePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && url.pathname === '/script.js') {
        // Serve the JavaScript file
        const jsFilePath = path.join(__dirname, 'script.js');
        fs.readFile(jsFilePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading JavaScript file');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else {
        const fileName = url.searchParams.get('file');
        const content = url.searchParams.get('content');

        if (req.method === 'POST' && fileName && content) {
            createFile(fileName, content);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File created');
        } else if (req.method === 'GET' && fileName) {
            const fileContent = readFile(fileName);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(fileContent);
        } else if (req.method === 'DELETE' && fileName) {
            const deleteMessage = deleteFile(fileName);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(deleteMessage);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid request');
        }
    }
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

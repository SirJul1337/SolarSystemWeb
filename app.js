const http = require('http');
const fs = require('fs');
const path = require('path');
const router =  require('./JS/Router')
// Define the routes and their corresponding file paths
const routes = router.routes

// Create the server
const server = http.createServer((req, res) => {
  // Get the requested URL and remove any query parameters
  const url = req.url.split('?')[0];
  
  // Look up the corresponding file path for the requested route
  const filePath = routes[url];

  if (filePath) {
    // Read the file and serve its content
    const file = fs.readFileSync(path.join(__dirname, filePath));
    const contentType = getContentType(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(file);
  } else {
    // Route not found, return a 404 error
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});

// Helper function to determine the content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'application/octet-stream';
  }
}

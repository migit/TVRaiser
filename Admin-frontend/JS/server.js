const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();
// Serve static files from the "TVRaiser" directory
app.use(express.static("TVRaiser"));

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);

  // Serve the index.html file by default
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "../pages/index.html";
  }

  // Determine the content type based on the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };
  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(
          "<h1>404 Not Found</h1><p>The requested URL " +
            req.url +
            " was not found on this server.</p>"
        );
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(
          "<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL " +
            req.url +
            "</p>"
        );
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

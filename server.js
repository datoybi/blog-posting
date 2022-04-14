// 실행하려면 node ~
const http = require('http');
const fs = require("fs");
const path = require("path");

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

const mimeLookup = {
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

const server = http.createServer((req, res) => {
  if(req.method == 'GET'){
    let filepath = path.resolve('./' + req.url);
    let fileExt = path.extname(filepath);
    let mimeType = mimeLookup[fileExt];

    if(!mimeType) {
      send404(res);
      return;
    }

    fs.exists(filepath, (exists) => {
      if(!exists){
        send404(res);
        return;
      }

      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filepath).pipe(res);

    });

  }
}).listen(3000);
console.log("Server running at port 3000");
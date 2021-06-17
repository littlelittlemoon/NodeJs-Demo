const http = require("http");
const url = require("url");
// const formidable = require("formidable");
// const util = require('util');

const PORT = 8888

function start(route, handle) {
  function onRequest(req, res) {
    // if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    //   // parse a file upload
    //   let form = new formidable.IncomingForm();
    //   form.parse(req, (err, fields, files) => {
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.write('Received upload: \n\n');
    //     res.end(util.inspect({ fields, files }));
    //   })
    // }
    // console.log("Request received!");   
    // let postData = '';
    let pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`)
    route(handle, pathname, res, req);

    // req.setEncoding('utf8');

    // req.addListener('data', (postDataChunk) => {
    //   postData += postDataChunk;
    //   console.log(`Received POST data chunk ${postDataChunk}.`);
    // });

    // req.addListener('end', () => {
    //   route(handle, pathname, res, postData);
    // });
  }
  http.createServer(onRequest).listen(PORT);
  console.log(`server listening in ${PORT}`);
}

exports.start = start;
// const exec = require("child_process").exec;
const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");

function start(res, req) {
  console.log("Request hander 'start' was called")
  // exec("find /", { timeout: 10000, maxBuffer: 20000 * 1024 }, 
  // (error, stdout, stderr) => {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.write(stdout);
  //   res.end();
  // });
  let body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html";charset=UTF-8/>' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';
    
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(body);
    res.end();
}

function upload(res, req) {
  console.log("Request hander 'upload' was called")

  // parse a file upload
  let form = new formidable.IncomingForm();

  console.log('start parse ...');

  form.parse(req, (err, fields, files) => {
    console.log('parse done!');
    fs.renameSync(files.upload.path, "./tmp/test.jpeg");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Received image: <br/>");
    res.write("<img src='/show' />");
    res.end();
  });
}

function show(res, postData) {
  console.log("Request hander 'show' was called");

  fs.readFile("./tmp/test.jpeg", "binary", (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write(`${err}\n`);
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/jpeg" });
      res.write(file, "binary");
      res.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
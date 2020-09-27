#! /usr/bin/env node
const dir = require("node-dir");
const fs = require("fs");
const mime = require("mime-types");

const ipath = process.argv[2].replace(/\/$/, "") + "/";
const opath = process.argv[3];

function transform() {
  var out = fs.createWriteStream(opath);
  out.write("const files = {};\n");
  out.write("export default files;\n");
  dir.files(ipath, function (error, paths) {
    if (error) throw error;
    for (const path of paths) {
      const rpath = path.substring(ipath.length);
      const buffer = fs.readFileSync(path);
      const info = {
        path: rpath,
        mime: mime.lookup(rpath),
        size: buffer.length,
      };
      out.write(`files["${rpath}"] = ${JSON.stringify(info)};\n`);
      out.write(`files["${rpath}"].data = atob("${buffer.toString("base64")}");\n`);
    }
  });
}

transform();

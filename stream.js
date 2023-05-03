const fs = require("fs");

const rs = fs.createReadStream("loremIpsum.txt", {encoding: "utf-8"});

const ws = fs.createWriteStream("new-promise.txt");

rs.pipe(ws);
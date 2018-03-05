let fs = require('fs');
let path = require('path');

function getFiles (dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

async function sortFiles () {
  let files = await getFiles('./foxes-img');
  if (!fs.existsSync('./result')) {
    fs.mkdirSync('./result');
  }
  files.forEach(function (item) {
    let name = path.basename(item);
    let dirName = './result/' + name.slice(0, 1);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    let readable = fs.createReadStream(item);
    let writeable = fs.createWriteStream(dirName + '/' + name);
    readable.pipe(writeable);
  });
}

sortFiles();

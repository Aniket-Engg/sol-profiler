const fs = require('fs');

var files = [];

function deepReadDir(path){
    let filesArr = fs.readdirSync(path)
    for(let file of filesArr){
        if(fs.lstatSync(path + '/'+file).isDirectory())
            deepReadDir(path + '/'+file);
        else if(!files.includes(path + '/'+file))
            files.push(path + '/'+file)
    }
    return files;
}

module.exports.getAllfiles = deepReadDir;

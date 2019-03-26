const path = require('path'),
    fs = require('fs');

var regEx = {
    pragma  :   /(pragma solidity (.+?);)/g,
    import  :   /import ['"](.+?)['"];/g
};

var processedFiles = [];

var processFile = async(file) => {

    if (processedFiles.indexOf(file) !== -1) 
        return;
      
    processedFiles.push(file);
    let result = '';

    let contents = fs.readFileSync(file, { encoding: 'utf-8' });
    contents = contents.replace(regEx.pragma, '').trim();
    let imports = await processImports(file, contents);

    for (let i = 0; i < imports.length; i++) {
      result += imports[i] + '\n\n';
    }
    contents = contents.replace(regEx.import, '').trim();
    result += contents;
    return result;
}

var processImports = async (file, content) => {
    let group='';
    let result = [];
    regEx.import.exec(''); // Resetting state of RegEx
    while (group = regEx.import.exec(content)) {
      let _importFile = group[1];
      let filePath = path.join(path.dirname(file), _importFile);
      filePath = path.normalize(filePath);
      let fileContents = await processFile(filePath);
      if (fileContents) {
        result.push(fileContents);
      }
    }
    return result;

  }

var getPragma = async(path) => {
    let contents = fs.readFileSync(path, { encoding: 'utf-8' });
    let group = regEx.pragma.exec(contents);
    return group && group[1];
}

module.exports.process = processFile;
module.exports.getPragma = getPragma;
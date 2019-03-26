#!/usr/bin/env node

const parser= require("solparse"),
     clc    = require("cli-color"),
     table  = require('table'),
     {data, file, profile}  = require('./../utils');

let config  = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,
 
        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,
 
        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,
 
        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

if(process.argv.length < 3) {
  console.log(clc.redBright("Error: No file provided"));
  process.exit(1);
}

let filePath   = process.argv[2];

/* jshint ignore:start */
async function generateReport(path){
    try{
        let tableRows = [];

        // Adding filename and solidity version
        let version;
        let pragma = await file.getPragma(path);
        let code = await file.process(path);
        let source = parser.parse(pragma + '\n\n' + code);
        /* jshint ignore:end */
        if(source.body[0].type == 'PragmaStatement')
            version = source.body[0].start_version.version;
        let fileArray = path.split('/');
        let fileName = fileArray[fileArray.length -1];
        let contractName = fileName.substr(0, fileName.length - 4);
        tableRows.push(['',clc.greenBright("File: " + fileName + " , Solidity Pragma: " + version), '','','','']);

        // Adding header row 
        tableRows.push([clc.whiteBright.bold('Contract/Library'), clc.whiteBright.bold('Function/Constructor'), clc.whiteBright.bold('Visibility'), clc.whiteBright.bold('View/Pure'), clc.whiteBright.bold('Returns'), clc.whiteBright.bold('Modifiers')]);
        source.body.forEach(function(contract) {
            if(contract.type == 'ContractStatement' || contract.type == 'LibraryStatement') {
                contract.body.forEach(function(part) {
                if(part.type == 'ConstructorDeclaration' || (part.type == 'FunctionDeclaration' && part.is_abstract == false)) {
                    let {contractName, functionName, visibility, viewOrPure, returns, modifiers} = data.parseData(contract, part);
                    tableRows.push([contractName, functionName, visibility, viewOrPure, returns, modifiers]);
                }
            });
            }
        });
        /* jshint ignore:start */
        var tableData = table.table(tableRows, config); /* jshint ignore:end */

        // Store profile in profiles folder
        profile.store(tableData, contractName);
        
        //Render profile on console
        console.log(tableData);
    }catch(error){
        console.log(clc.red(error.message));
    };

}

module.exports = generateReport(filePath);

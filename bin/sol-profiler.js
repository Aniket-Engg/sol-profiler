#!/usr/bin/env node

const parser= require("solparse"),
     clc    = require("cli-color"),
     table  = require('table'),
     utils  = require('./../utils');

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

        let pragma = await utils.getPragma(path);
        let code = await utils.processFile(path);
        let source = parser.parse(pragma + '\n\n' + code);
        /* jshint ignore:end */
        if(source.body[0].type == 'PragmaStatement')
            version = source.body[0].start_version.version;
        
        let fileArray = path.split('/');
        let file = fileArray[fileArray.length -1];
        let contractName = file.substr(0, file.length - 4);
        tableRows.push(['',clc.greenBright("File: " + file + 
                " , Solidity Pragma: " + version), '','','','']);

        // Adding header row 
        tableRows.push([clc.whiteBright.bold('Contract/Library'), clc.whiteBright.bold('Function/Constructor'), clc.whiteBright.bold('Visibility'), clc.whiteBright.bold('View/Pure'), clc.whiteBright.bold('Returns'), clc.whiteBright.bold('Modifiers')]);

        source.body.forEach(function(contract) {
            if(contract.type == 'ContractStatement' || contract.type == 'LibraryStatement') {
                contract.body.forEach(function(part) {
                if(part.type == 'ConstructorDeclaration' || (part.type == 'FunctionDeclaration' && part.is_abstract == false)) {
                    let {contractName, functionName, visibility, viewOrPure, returns, modifiers} = parsePartData(contract, part);
                    tableRows.push([contractName, functionName, visibility, viewOrPure, returns, modifiers]);
                }
            });
            }
        });
        /* jshint ignore:start */
        var tableData = table.table(tableRows, config); /* jshint ignore:end */
        let fileData = tableData.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''); // clearing color formatting
        require("fs").writeFileSync(contractName + "_Profile.txt", fileData);
        console.log(tableData); 
    }catch(error){
        console.log(clc.red(error.message));
    };

}

function parsePartData(contract, part) {
    let contractName = clc.cyanBright(contract.name);
    if(contract.type == 'LibraryStatement')
        contractName = contractName + clc.white(' -lib');
    
    let funcName = null;
    if(part.type == 'ConstructorDeclaration')
        funcName = 'constructor';
        else if(part.type == 'FunctionDeclaration'){
                funcName = part.name || '';
        }

    let params = [];
    if(part.params) {
        part.params.forEach(function(param) {
            if(param.storage_location)
                params.push(param.literal.literal + ' ' + clc.cyan(param.storage_location));
            else
                params.push(param.literal.literal);
        });
    funcName += '(' + params.join(',') + ')';
    }
    else {
        //Check fallback
        if(!funcName && !part.name && !part.params && !part.returnParams)
            funcName = '()' + clc.white(' -fallback');
        else
            funcName += '()';
    }

    // Default is public
    let visibility = clc.magentaBright("public");
    let  viewOrPure = '';
    let  returns    = [];
    let  custom     = [];

    if(part.modifiers) {
        part.modifiers.forEach(function(mod) {
            switch(mod.name) {
                case "public":
                    break;
                case "private":
                    visibility = clc.redBright("private");
                    break;
                case "internal":
                    visibility = clc.red("internal");
                    break;
                case "external":
                    visibility = clc.magenta("external");
                    break;
                case "view":
                    viewOrPure = clc.yellow("view");
                    break;
                case "pure":
                    viewOrPure = clc.yellowBright("pure");
                    break;
                default:
                    custom.push(mod.name);
            }
        });
    }
    if(part.returnParams) {
        part.returnParams.params.forEach(function(param) {
            if(param.storage_location)
                returns.push(param.literal.literal + ' ' + clc.cyan(param.storage_location));
            else
                returns.push(param.literal.literal);
        });
    }

    return {
        contractName:   contractName,
        functionName:   clc.blueBright(funcName),
        visibility  :   visibility,
        viewOrPure  :   viewOrPure,
        returns     :   clc.white(returns),
        modifiers   :   clc.white(custom)
    };
}

module.exports = generateReport(filePath);

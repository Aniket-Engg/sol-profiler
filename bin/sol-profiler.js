#!/usr/bin/env node

const parser    = require("solparse");
const fs        = require('fs');
const clc       = require("cli-color");
const table     = require('table');

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
let source = fs.readFileSync(filePath).toString();
let parsedSource = parser.parse(source);

generateReport(filePath, parsedSource);

function generateReport(path, source) {
    let tableRows = [];

    // Adding filename and solidity version
    let version;
    if(source.body[0].type == 'PragmaStatement')
        version = source.body[0].start_version.version;
    
    let fileArray = path.split('/');
    tableRows.push(['',clc.greenBright("File: " + fileArray[fileArray.length -1] + 
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
        })
        }
    })
   console.log(table.table(tableRows, config));
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
    }
}

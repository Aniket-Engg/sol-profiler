const parser    = require("solparse");
const asciiTable= require('ascii-table');
const fs        = require('fs');

if(process.argv.length < 3) {
  console.log("Error: Missing argument for sol file to scan");
  process.exit(1);
}

var filePath   = process.argv[2];
const source = fs.readFileSync(filePath).toString();
var parsedSource = parser.parse(source);

generateReport(filePath, parsedSource);

function generateReport(path, source) {
    var table = new asciiTable(path);
    table.setHeading('Contract/Library', 'Function/Constructor', 'Visibility', 'View/Pure', 'Returns', 'Modifiers');

    source.body.forEach(function(contract) {
        if(contract.type == 'ContractStatement' || contract.type == 'LibraryStatement') {
            contract.body.forEach(function(part) {
            if(part.type == "ConstructorDeclaration" || (part.type == "FunctionDeclaration" && part.is_abstract == false)) {
                let {contractName, functionName, visibility, viewOrPure, returns, modifiers} = parsePartData(contract, part);
                table.addRow(contractName, functionName, visibility, viewOrPure, returns, modifiers);
            }
        })
        }
    })
    console.log(table.toString());
}

function parsePartData(contract, part) {
    let contractName = contract.name;
    let funcName     = part.name || "";
    let params       = [];

    if(part.params) {
        part.params.forEach(function(param) {
        params.push(param.literal.literal);
    });
    funcName += "(" + params.join(',') + ")"
    } 
    else {
        funcName += "()"
    }

    // Default is public
    let visibility = "public";
    let  viewOrPure = '';
    let  returns    = [];
    let  custom     = [];

    if(part.modifiers) {
        part.modifiers.forEach(function(mod) {
            switch(mod.name) {
                case "public":
                    break;
                case "private":
                    visibility = "private";
                    break;
                case "internal":
                    visibility = "internal";
                    break;
                case "external":
                    visibility = "external";
                    break;
                case "view":
                viewOrPure = "view";
                    break;
                case "pure":
                viewOrPure = "pure";
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
        functionName:   funcName,
        visibility  :   visibility,
        viewOrPure  :   viewOrPure,
        returns     :   returns,
        modifiers   :   custom
    }
}

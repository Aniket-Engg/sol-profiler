const clc = require("cli-color");

module.exports.parseData = (contract, part) => {
        let contractName = clc.cyanBright(contract.name);
        if(contract.type == 'LibraryStatement')
            contractName = contractName + clc.blackBright(' (library)');
        else if(contract.type == 'InterfaceStatement')
            contractName = contractName + clc.whiteBright(' (interface)');
        
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

        if(part.is_abstract)
                funcName += clc.green(' -abstract');
    
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
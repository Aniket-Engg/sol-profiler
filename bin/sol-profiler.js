#!/usr/bin/env node

const clc    = require('cli-color'),
     fs    = require('fs'),
     { generateAndStore }  = require('./../lib/generate'),
     {directory}  = require('./../utils');

if(process.argv.length < 3) {
  console.log(clc.redBright("Error: No file or directory provided"));
  process.exit(1);
}

let path = process.argv[2];
/* jshint ignore:start */
var profiler = async(path) => {
    try{
        if(fs.lstatSync(path).isDirectory()){
            let count = 0;
            let files = directory.getAllfiles(path);
            for(const file of files){
                if(file.substr(-4) == '.sol'){
                    await generateAndStore(file);
                    count++;
                }
            }
            if(count)
                console.log(clc.green('Info: Found '+ count + ' Solidity files!!! Generated profiles stored in '+ process.cwd() + '/profiles'));
            else
                console.log(clc.green('Info: No Solidity files found in directory'));
        }
        else{
            if(path.substr(-4) == '.sol'){
                let tableData = await generateAndStore(path);
                
                //Render profile on console
                console.log(tableData);
            }
            else
                console.warn(clc.yellow('Warning: Please provide a solidity file'));
        }
    }catch(error){
        console.error(clc.redBright('Error in generating profile: ' + error.message));
    };
}
/* jshint ignore:end */
module.exports = profiler(path);



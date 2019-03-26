const path = require('path'),
    fs = require('fs');


module.exports.store = (data, contractName) => {
    if(!fs.existsSync(path.join(process.cwd(), '/profiles')))
        fs.mkdirSync(path.join(process.cwd(), '/profiles'));
    let fileData = data.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''); // clearing color formatting
    
    fs.writeFileSync(path.join(process.cwd(), 'profiles', contractName + '_Profile.txt'), fileData); 
}
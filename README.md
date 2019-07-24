# sol-profiler
[![npm version](https://badge.fury.io/js/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![Build status](https://travis-ci.com/Aniket-Engg/sol-profiler.svg?branch=master)](https://travis-ci.com/Aniket-Engg/sol-profiler)
[![dependencies Status](https://david-dm.org/aniket-engg/sol-profiler/status.svg)](https://david-dm.org/aniket-engg/sol-profiler)
[![devDependencies Status](https://david-dm.org/aniket-engg/sol-profiler/dev-status.svg)](https://david-dm.org/aniket-engg/sol-profiler?type=dev)
[![npm](https://img.shields.io/npm/dw/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![npm](https://img.shields.io/npm/dt/sol-profiler.svg?label=Total%20Downloads)](https://www.npmjs.com/package/sol-profiler)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Aniket-Engg/sol-profiler)
[![LoC](https://tokei.rs/b1/github/Aniket-Engg/sol-profiler?category=lines)](https://github.com/Aniket-Engg/sol-profiler)
[![Package Quality](https://npm.packagequality.com/shield/sol-profiler.svg)](https://packagequality.com/#?package=sol-profiler)

sol-profiler lists down the properties of all the contract methods which helps to visualize and review the definition of various contract methods involved at one glance. This is easy to use and user-friendly.

<b>Note: </b>sol-profiler does not ensure/guarantee any kind of security or correctness of any smart-contract.

## Features
* Lists down attributes of contract methods 
* Works with file & directory both
* Displays user friendly colourful profile on console for single file
* Also stores generated profile in a folder names `profiles` in a `.txt` file named with suffix `_Profile`
* Generates & stores profile for each available Solidity file if directory path is passed
* Supports file import relatively and from `node_modules`
* Explicitly marks `abstract` and `fallback` functions
* Explicitly marks `library` and `interface` contracts
* Since Solidity release 0.5.0, Explicit data location for all variables of struct, array or mapping types is now mandatory, so profile also include the data location of parameters defined explicitly.

## Install
```
npm install --global sol-profiler
```
or
```
npm install --save-dev sol-profiler
```

## Application
For DApp, one can provide its contract directory path and profile will be stored for each contract which can be referred in future to get the knowledge of the methods defined in various contract.
```
sol-profiler <dapp/contracts/or/any/directory/path>
```

It can be used for individual file as:
```
sol-profiler <solidity/contract/file/path>
```
It can also be added in the `package.json` as:
```
{
  "scripts": {
    "generateProfile": "sol-profiler ./contracts/"
  },
}
```
## Example
We have attached an extensive example i.e. [sample.sol](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/sample.sol). For this, profiler result will be same as in below image : 

![solp2](https://user-images.githubusercontent.com/30843294/55281218-4bc56a80-5357-11e9-852f-520dde666b9d.png)

Generated profile which get stored in `.txt` file can be seen [here](https://github.com/Aniket-Engg/sol-profiler/blob/master/profiles/sample_Profile.txt).

## VSCode Extension
sol-profiler is also available as [Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=Aniket-Engg.sol-profiler-vscode)

## Contribution/Suggestions
Any kind of suggestion/feedback/contribution is most welcome!

## License
[MIT](https://github.com/Aniket-Engg/sol-profiler/blob/master/LICENSE)

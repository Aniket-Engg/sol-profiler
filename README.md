# sol-profiler
[![npm version](https://badge.fury.io/js/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![devDependency Status](https://david-dm.org/aniket-engg/sol-profiler.svg)](https://david-dm.org/aniket-engg/sol-profiler#info=dependencies)
[![npm](https://img.shields.io/npm/dt/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Aniket-Engg/sol-profiler)
[![Known Vulnerabilities](https://snyk.io/test/github/Aniket-Engg/sol-profiler/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Aniket-Engg/sol-profiler?targetFile=package.json)

sol-profiler lists down the attributes of all the functions/constructor of a single `.sol` file. sol-profiler is colourful and easy to use. It displays the profile of contracts & libraries in the file along with the `pragma`.

It works best with solidity version >=0.4.22

It marks the `library` contracts and `fallback` function explicitly, see [example](https://github.com/Aniket-Engg/sol-profiler#example).

<b>Note: </b>sol-profiler does not ensure/guarantee any kind of security or correctness of any smart-contract.

## Install
```
npm install --save-dev sol-profiler
```

## Run
```
./node_modules/.bin/sol-profiler <contract source path>
```
This does not work on imported files. You can use the available npm packages to merge the files in one.

## Example
We have attached an extensive example i.e. [sample.sol](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/sample.sol). For this, profiler result will be same as in below image : 

![profiler2](https://user-images.githubusercontent.com/30843294/48480363-1d277700-e830-11e8-90fb-570f9479d104.png)

## Contribution/Suggestions
Any kind of suggestions or contribution are most welcome!

## License
[MIT](https://github.com/Aniket-Engg/sol-profiler/blob/master/LICENSE)

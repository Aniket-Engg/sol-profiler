# sol-profiler
[![npm version](https://badge.fury.io/js/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![Build status](https://travis-ci.com/Aniket-Engg/sol-profiler.svg?branch=master)](https://travis-ci.com/Aniket-Engg/sol-profiler)
[![dependencies Status](https://david-dm.org/aniket-engg/sol-profiler/status.svg)](https://david-dm.org/aniket-engg/sol-profiler)
[![devDependencies Status](https://david-dm.org/aniket-engg/sol-profiler/dev-status.svg)](https://david-dm.org/aniket-engg/sol-profiler?type=dev)
[![npm](https://img.shields.io/npm/dt/sol-profiler.svg)](https://www.npmjs.com/package/sol-profiler)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Aniket-Engg/sol-profiler)
[![LoC](https://tokei.rs/b1/github/Aniket-Engg/sol-profiler?category=lines)](https://github.com/Aniket-Engg/sol-profiler).

Works best with solidity version >=0.4.22 !!!

sol-profiler lists down the attributes of all the functions/constructor of a single `.sol` file. sol-profiler is colourful and easy to use. It displays the profile of contracts & libraries in the file along with the `pragma`. It also stores generated profile in a `.txt` file in the project folder.

It marks the `library` contracts and `fallback` function explicitly, see [example](https://github.com/Aniket-Engg/sol-profiler#example).

<b>Note: </b>sol-profiler does not ensure/guarantee any kind of security or correctness of any smart-contract.

<b>Update v1.3.0:</b>

Since Solidity release 0.5.0, Explicit data location for all variables of struct, array or mapping types is now mandatory, so profile also include the data location of parameters defined explicitly. For example, see [sample profile](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/ERC721Metadata_Profile.txt) with storage location specifier for [ERC721Metadata.sol](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/ERC721Metadata.sol) (fetched from [openzepplin-solidity](https://github.com/OpenZeppelin/openzeppelin-solidity)).

## Install
```
npm install --save-dev sol-profiler
```

## Run
```
./node_modules/.bin/sol-profiler <contract source path>
```
sol-profiler supports import of files relative to passed file not the contracts from <i>node_modules</i> folder (like for openzepplin-solidity package). You can use the available npm packages to merge the files from <i>node_modules</i>.

## Example
We have attached an extensive example i.e. [sample.sol](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/sample.sol). For this, profiler result will be same as in below image : 

![profiler2](https://user-images.githubusercontent.com/30843294/48480363-1d277700-e830-11e8-90fb-570f9479d104.png)

Generated profile which get stored in `.txt` file can be seen [here](https://github.com/Aniket-Engg/sol-profiler/blob/master/example/sample_Profile.txt).

## VSCode Extension
sol-profiler is also available as [Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=Aniket-Engg.sol-profiler-vscode) which generates and stores profile of a contract opened in Editor.

## Contribution/Suggestions
Any kind of suggestions or contribution are most welcome!

## License
[MIT](https://github.com/Aniket-Engg/sol-profiler/blob/master/LICENSE)

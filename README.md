# sol-profiler
sol-profiler lists down the attributes of all the functions/constructor of a single `.sol` file

<b>Note: </b>sol-profiler does not ensure/guarantee any kind of security or correctness of any smart-contract.

## Install
```
npm install --save-dev sol-profiler
```

## Run
```
./node_modules/.bin/sol-profiler <contract source path>
```
This does not work on imported files. You can use the available node modules to merge the files in one.

## Example
For openzepplin `Ownable` contract, 

```
$ ./node_modules/.bin/sol-profiler contracts/ownership/Ownable.sol

.-----------------------------------------------------------------------------------------------.
|                                contracts/ownership/Ownable.sol                                |
|-----------------------------------------------------------------------------------------------|
| Contract/Library |    Function/Constructor     | Visibility | View/Pure | Returns | Modifiers |
|------------------|-----------------------------|------------|-----------|---------|-----------|
| Ownable          | ()                          | internal   |           |         |           |
| Ownable          | owner()                     | public     | view      | address |           |
| Ownable          | isOwner()                   | public     | view      | bool    |           |
| Ownable          | renounceOwnership()         | public     |           |         | onlyOwner |
| Ownable          | transferOwnership(address)  | public     |           |         | onlyOwner |
| Ownable          | _transferOwnership(address) | internal   |           |         |           |
'-----------------------------------------------------------------------------------------------'

```

## Contribution/Suggestions
Any kind of suggestions or contribution are most welcome!
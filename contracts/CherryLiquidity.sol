pragma solidity ^0.5.0;

import "./CherryToken.sol";

contract CherryLiquidity {
  string public name = "CherryLiquidity";
  address public owner;
  CherryToken public cherryToken;
  uint256 private ethBalance;
  uint256 private ctnBalance;

  constructor(CherryToken _cherryToken, uint256 _initialEthSupply, uint256 _initialCtnSupply) public {
    cherryToken = _cherryToken;
    ethBalance = _initialEthSupply;
    ctnBalance = _initialCtnSupply;
    owner = msg.sender;
  }

  function getEthBalance() public view returns (uint balance) {
    return ethBalance;
  }

  function getCtnBalance() public view returns (uint balance) {
    return ctnBalance;
  }

  function addLiquidity(uint _ethAmount, uint _ctnAmount) public {

  }

  function removeLiquidity(uint _ethAmount, uint _ctnAmount) public {

  }
}
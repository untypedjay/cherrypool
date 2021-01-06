pragma solidity ^0.5.0;

import "./CherryToken.sol";

contract CherryLiquidity {
  string public name = "CherryLiquidity";
  address public owner;
  CherryToken public cherryToken;

  constructor(CherryToken _cherryToken) public {
    cherryToken = _cherryToken;
    owner = msg.sender;
  }

  function addLiquidity(uint _ethAmount, uint _ctnAmount) public {

  }

  function removeLiquidity(uint _ethAmount, uint _ctnAmount) public {

  }
}
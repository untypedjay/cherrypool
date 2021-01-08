pragma solidity ^0.5.0;

import "./CherryToken.sol";
import "./CherryLiquidity.sol";

contract CherrySwap {
  string public name = "CherrySwap";
  address public owner;
  CherryToken public cherryToken;
  CherryLiquidity public cherryLiquidity;

  constructor(CherryToken _cherryToken, CherryLiquidity _cherryLiquidity) public {
    cherryToken = _cherryToken;
    cherryLiquidity = _cherryLiquidity;
    owner = msg.sender;
  }

  function () external payable {
    ethToCtn();
  }

  function ethToCtn() public payable {
    require(msg.value > 0, "amount cannot be 0");
    // TODO: calculate fees
    uint256 fees = ...;
    // TODO: compute ctn amount
    uint256 ctnAmount = ...;
    require(cherryLiquidity.getCtnBalance() >= ctnAmount, "not enough funds available");
    address(cherryLiquidity).transfer(msg.value);
    cherryLiquidity.processEthToCtn(msg.sender, ctnAmount, fees);
  }

  function ctnToEth(uint256 _amount) public {
    require(_amount > 0, "amount cannot be 0");
    // TODO: calculate fees
    uint256 fees = ...;
    // TODO: compute eth amount
    uint256 ethAmount = ...;
    require(cherryLiquidity.getEthBalance() >= ethAmount, "not enough funds available");
    cherryToken.transferFrom(msg.sender, address(cherryLiquidity), _amount);
    cherryLiquidity.processCtnToEth(msg.sender, ethAmount, fees);
  }
}
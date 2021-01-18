pragma solidity ^0.5.0;

import "./CherryToken.sol";
import "./CherryLiquidity.sol";

contract CherrySwap {
  address private _owner;
  CherryToken private _cherryToken;
  CherryLiquidity private _cherryLiquidity;

  constructor(CherryToken cherryToken, CherryLiquidity cherryLiquidity) public {
    _cherryToken = cherryToken;
    _cherryLiquidity = cherryLiquidity;
    _owner = msg.sender;
  }

  function () external payable {
    ethToCtn();
  }

  function ethToCtn() public payable {
    require(msg.value > 0, "amount cannot be 0");
    uint256 fees = msg.value * 2 / 10000; // 2%
    uint256 ctnAmount = (msg.value * 1000) - fees; // TODO: refactor
    require(_cherryLiquidity.getCtnBalance() >= ctnAmount, "not enough funds available");
    address(_cherryLiquidity).transfer(msg.value);
    _cherryLiquidity.processEthToCtn(msg.sender, ctnAmount, fees);
  }

  function ctnToEth(uint256 amount) public {
    require(amount > 0, "amount cannot be 0");
    uint256 fees = amount * 2 / 10000; // 2%
    uint256 ethAmount = (amount - fees) / 1000; // TODO: refactor
    require(_cherryLiquidity.getEthBalance() >= ethAmount, "not enough funds available");
    _cherryToken.transferFrom(msg.sender, address(_cherryLiquidity), amount);
    _cherryLiquidity.processCtnToEth(msg.sender, ethAmount, fees);
  }
}
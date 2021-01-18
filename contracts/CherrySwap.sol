pragma solidity ^0.5.16;

import "./SafeMath.sol";
import "./CherryToken.sol";
import "./CherryLiquidity.sol";

contract CherrySwap {
  using SafeMath for uint256;

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
    uint256 fees = msg.value.mul(2).div(10000); // 2%
    uint256 ctnAmount = msg.value.mul(1000).sub(fees); // TODO: refactor
    require(_cherryLiquidity.getCtnBalance() >= ctnAmount, "not enough funds available");
    address(_cherryLiquidity).transfer(msg.value);
    _cherryLiquidity.processEthToCtn(msg.sender, ctnAmount, fees);
  }

  function ctnToEth(uint256 amount) public {
    require(amount > 0, "amount cannot be 0");
    uint256 fees = amount.mul(2).div(10000); // 2%
    uint256 ethAmount = amount.sub(fees).div(1000); // TODO: refactor
    require(_cherryLiquidity.getEthBalance() >= ethAmount, "not enough funds available");
    _cherryToken.transferFrom(msg.sender, address(_cherryLiquidity), amount);
    _cherryLiquidity.processCtnToEth(msg.sender, ethAmount, fees);
  }
}
pragma solidity ^0.5.16;

import "./SafeMath.sol";
import "./CherryToken.sol";

contract CherryPool {
  using SafeMath for uint256;

  address private _owner;
  CherryToken private _cherryToken;

  uint256 private _availableRewards = 0;

  mapping(address => uint256) private _liquidityTokenBalances;

  constructor(CherryToken cherryToken) public {
    _cherryToken = cherryToken;
    _owner = msg.sender;
  }

  function () external payable {}

  function getEthBalance() public view returns (uint256 balance) {
    return address(this).balance;
  }

  function getCtnBalance() public view returns (uint256 balance) {
    return _cherryToken.balanceOf(address(this));
  }

  function getAvailableRewards() public view returns (uint256 rewards) {
    return _availableRewards;
  }

  function getLiquidityTokenBalance(address owner) public view returns (uint256 funds) {
    return _liquidityTokenBalances[owner];
  }

  function addLiquidity(uint256 ctnAmount, uint256 liquidityTokenAmount) public payable {
    require(msg.value > 0, "ETH amount cannot be 0");
    require(_cherryToken.balanceOf(msg.sender) >= ctnAmount, "not enough CTN funds");
    _cherryToken.transferFrom(msg.sender, address(this), ctnAmount);
    _liquidityTokenBalances[msg.sender] = _liquidityTokenBalances[msg.sender].add(liquidityTokenAmount);
  }

  function removeLiquidity(uint256 ethAmount, uint256 ctnAmount, uint256 liquidityTokenAmount, uint256 totalLiquidityTokens) public {
    require(ethAmount > 0, "eth amount cannot be 0");
    require(ctnAmount > 0, "ctn amount cannot be 0");
    require(getEthBalance() >= ethAmount, "not enough ETH in pool");
    require(getCtnBalance() >= ctnAmount, "not enough CTN in pool");
    require(_liquidityTokenBalances[msg.sender] > liquidityTokenAmount, "not enough liquidity tokens");
    uint256 ctnRewards = _availableRewards.mul(liquidityTokenAmount.div(totalLiquidityTokens));
    _availableRewards = _availableRewards.sub(ctnRewards);
    _cherryToken.mint(msg.sender, ctnRewards);
    _cherryToken.transfer(msg.sender, ctnAmount);
    msg.sender.transfer(ethAmount);
    _liquidityTokenBalances[msg.sender] = _liquidityTokenBalances[msg.sender].sub(liquidityTokenAmount);
  }

  function swapEthToCtn(uint256 ctnOutput, uint256 fees) public payable {
    require(msg.value > 0, "amount cannot be 0");
    _addFees(fees);
    require(getCtnBalance() >= ctnOutput, "not enough funds available");
    _cherryToken.transfer(msg.sender, ctnOutput);
  }

  function swapCtnToEth(uint256 ctnInput, uint ethOutput, uint256 fees) public {
    require(ctnInput > 0, "amount cannot be 0");
    _addFees(fees);
    require(getEthBalance() >= ethOutput, "not enough funds available");
    _cherryToken.transferFrom(msg.sender, address(this), ctnInput);
    msg.sender.transfer(ethOutput);
  }

  function _addFees(uint256 amount) private {
    _availableRewards = _availableRewards.add(amount.mul(10));
  }
}
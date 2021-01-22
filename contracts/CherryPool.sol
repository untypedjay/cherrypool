pragma solidity ^0.5.16;

import "./SafeMath.sol";
import "./CherryToken.sol";

contract CherryPool {
  using SafeMath for uint256;

  address private _owner;
  CherryToken private _cherryToken;

  uint256 private _collectedFees = 0;

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
    return _cherryToken.balanceOf(address(this)).sub(_collectedFees);
  }

  function getCollectedFees() public view returns (uint256 fees) {
    return _collectedFees;
  }

  function getLiquidityTokenBalances(address owner) public view returns (uint256 funds) {
    return _liquidityTokenBalances[owner];
  }

  function addLiquidity(uint256 ctnAmount, uint256 liquidityTokenAmount) public payable {
    require(msg.value > 0, "ETH amount cannot be 0");
    require(_cherryToken.balanceOf(msg.sender) >= ctnAmount, "not enough CTN funds");
    _cherryToken.transferFrom(msg.sender, address(this), ctnAmount);
    _liquidityTokenBalances[msg.sender] = _liquidityTokenBalances[msg.sender].add(liquidityTokenAmount);
  }

  function removeLiquidity(uint256 ethAmount, uint256 ctnAmount, uint256 liquidityTokenAmount, uint256 reward) public {
    require(ethAmount > 0, "eth amount cannot be 0");
    require(ctnAmount > 0, "ctn amount cannot be 0");
    require(getEthBalance() >= ethAmount, "not enough ETH in pool");
    require(getCtnBalance() >= ctnAmount, "not enough CTN in pool");
    require(_liquidityTokenBalances[msg.sender] > liquidityTokenAmount, "not enough liquidity tokens");
    require(_collectedFees >= reward, "invalid reward");
    uint256 ctnPayout = ctnAmount.add(reward);
    _cherryToken.transfer(msg.sender, ctnPayout);
    msg.sender.transfer(ethAmount);
    _liquidityTokenBalances[msg.sender] = _liquidityTokenBalances[msg.sender].sub(liquidityTokenAmount);
  }

  function swapEthToCtn() public payable returns (uint256 receivedCtn) {
    require(msg.value > 0, "amount cannot be 0");
    uint256 fees = msg.value.mul(100).div(1); // 10%
    uint256 ctnAmount = msg.value.mul(1000).sub(fees); // TODO: refactor
    _addFees(fees);
    require(getCtnBalance() >= ctnAmount, "not enough funds available");
    _cherryToken.transfer(msg.sender, ctnAmount);
    return ctnAmount;
  }

  function swapCtnToEth(uint256 amount) public returns (uint256 receivedEth) {
    require(amount > 0, "amount cannot be 0");
    uint256 ethAmount = amount.div(1000); // TODO: refactor
    uint256 fees = ethAmount.mul(1).div(10); // 10%
    _addFees(fees);
    require(getEthBalance() >= ethAmount.sub(fees), "not enough funds available");
    _cherryToken.transferFrom(msg.sender, address(this), amount);
    msg.sender.transfer(ethAmount);
    return ethAmount;
  }

  function _addFees(uint256 amount) private {
    _collectedFees = _collectedFees.add(amount);
  }
}
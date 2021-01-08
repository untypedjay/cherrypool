pragma solidity ^0.5.0;

import "./CherryToken.sol";
import "./CherrySwap.sol";

contract CherryLiquidity {
  string public name = "CherryLiquidity";
  address public owner;
  CherryToken public cherryToken;
  CherrySwap public cherrySwap;
  uint256 private ethBalance;
  uint256 private ctnBalance;
  uint256 private collectedFees = 0;
  mapping(address => uint256) private balancesInEth;
  mapping(address => uint256) private balancesInCtn;
  mapping(address => uint256) private unresolvedEth;

  constructor(CherryToken _cherryToken, CherrySwap _cherrySwap, uint256 _initialEthSupply, uint256 _initialCtnSupply) public {
    cherryToken = _cherryToken;
    cherrySwap = _cherrySwap;
    ethBalance = _initialEthSupply;
    ctnBalance = _initialCtnSupply;
    cherryToken.transferFrom(msg.sender, address(this), _initialCtnSupply);
    owner = msg.sender;
  }

  function getEthBalance() public view returns (uint256 balance) {
    return address(this).balance;
  }

  function getCtnBalance() public view returns (uint256 balance) {
    return cherryToken.balanceOf(address(this)) - collectedFees;
  }

  function getCollectedFees() public view returns (uint256 fees) {
    return collectedFees;
  }

  function addEthLiquidity() payable {
    require(msg.value > 0, "ETH amount cannot be 0");
    unresolvedEth[msg.sender] = unresolvedEth[msg.sender] + msg.value;
  }

  function addLiquidity(uint256 _ethAmount, uint256 _ctnAmount) public {
    require(unresolvedEth[msg.sender] >= _ethAmount, "ETH not sent yet");
    require(_ctnAmount > 0, "CTN amount cannot be 0");
    require(cherryToken.balanceOf(msg.sender) > _ctnAmount, "not enough CTN funds");
    unresolvedEth[msg.sender] = unresolvedEth[msg.sender] - _ethAmount;
    cherryToken.transferFrom(msg.sender, address(this), _ctnAmount);
    balancesInEth[msg.sender] = balancesInEth[msg.sender] + _ethAmount;
    balancesInCtn[msg.sender] = balancesInCtn[msg.sender] + _ctnAmount;
  }

  function removeLiquidity(uint256 _ethAmount, uint256 _ctnAmount, uint256 reward) public {
    require(_ethAmount > 0, "eth amount cannot be 0");
    require(_ctnAmount > 0, "ctn amount cannot be 0");
    require(getEthBalance() >= _ethAmount, "not enough ETH in pool");
    require(getCtnBalance() >= _ctnAmount, "not enough CTN in pool");
    require(balancesInEth[msg.sender] > _ethAmount, "not enough ETH deposited");
    require(balancesInCtn[msg.sender] > _ctnAmount, "not enough CTN deposited");
    require(collectedFees >= reward, "invalid reward");
    uint256 ctnPayout = _ctnAmount + reward;
    cherryToken.transferFrom(address(this), msg.sender, ctnPayout);
    msg.sender.transfer(_ethAmount);
    balancesInEth[msg.sender] = balancesInEth[msg.sender] - _ethAmount;
    balancesInCtn[msg.sender] = balancesInCtn[msg.sender] - _ctnAmount;
  }

  function getPooledEthFunds(address _owner) public returns (uint256 funds) {
    return balancesInEth[_owner];
  }

  function getPooledCtnFunds(address _owner) public returns (uint256 funds) {
    return balancesInCtn[_owner];
  }

  function processEthToCtn(address recipient, uint256 ctnAmount, uint256 fees) {
    require(msg.sender == address(cherrySwap), "address not authorized");
    addFees(fees);
    cherryToken.transfer(recipient, ctnAmount);
  }

  function processCtnToEth(address recipient, uint256 ethAmount, uint256 fees) {
    require(msg.sender == address(cherrySwap), "address not authorized");
    addFees(fees);
    recipient.transfer(ethAmount);
  }

  function addFees(uint256 _amount) private {
    collectedFees = collectedFees + _amount;
  }
}
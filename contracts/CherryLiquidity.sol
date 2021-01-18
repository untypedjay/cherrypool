pragma solidity ^0.5.0;

import "./CherryToken.sol";
import "./CherrySwap.sol";

contract CherryLiquidity {
  address private _owner;
  CherryToken private _cherryToken;
  CherrySwap private _cherrySwap;
  uint256 private _ethBalance;
  uint256 private _ctnBalance;
  uint256 private _collectedFees = 0;
  mapping(address => uint256) private _balancesInEth;
  mapping(address => uint256) private _balancesInCtn;
  mapping(address => uint256) private _unresolvedEth;

  constructor(CherryToken cherryToken, CherrySwap cherrySwap, uint256 initialEthSupply, uint256 initialCtnSupply) public {
    _cherryToken = cherryToken;
    _cherrySwap = cherrySwap;
    _ethBalance = initialEthSupply;
    _ctnBalance = initialCtnSupply;
    _cherryToken.transferFrom(msg.sender, address(this), initialCtnSupply);
    _owner = msg.sender;
  }

  function getEthBalance() public view returns (uint256 balance) {
    return address(this).balance;
  }

  function getCtnBalance() public view returns (uint256 balance) {
    return _cherryToken.balanceOf(address(this)) - collectedFees;
  }

  function getCollectedFees() public view returns (uint256 fees) {
    return _collectedFees;
  }

  function addEthLiquidity() payable {
    require(msg.value > 0, "ETH amount cannot be 0");
    _unresolvedEth[msg.sender] = _unresolvedEth[msg.sender] + msg.value;
  }

  function addLiquidity(uint256 ethAmount, uint256 ctnAmount) public {
    require(_unresolvedEth[msg.sender] >= ethAmount, "ETH not sent yet");
    require(ctnAmount > 0, "CTN amount cannot be 0");
    require(_cherryToken.balanceOf(msg.sender) > ctnAmount, "not enough CTN funds");
    _unresolvedEth[msg.sender] = _unresolvedEth[msg.sender] - ethAmount;
    _cherryToken.transferFrom(msg.sender, address(this), ctnAmount);
    _balancesInEth[msg.sender] = _balancesInEth[msg.sender] + ethAmount;
    _balancesInCtn[msg.sender] = _balancesInCtn[msg.sender] + ctnAmount;
  }

  function removeLiquidity(uint256 ethAmount, uint256 ctnAmount, uint256 reward) public {
    require(ethAmount > 0, "eth amount cannot be 0");
    require(ctnAmount > 0, "ctn amount cannot be 0");
    require(getEthBalance() >= ethAmount, "not enough ETH in pool");
    require(getCtnBalance() >= ctnAmount, "not enough CTN in pool");
    require(_balancesInEth[msg.sender] > ethAmount, "not enough ETH deposited");
    require(_balancesInCtn[msg.sender] > ctnAmount, "not enough CTN deposited");
    require(_collectedFees >= reward, "invalid reward");
    uint256 ctnPayout = ctnAmount + reward;
    _cherryToken.transferFrom(address(this), msg.sender, ctnPayout);
    msg.sender.transfer(ethAmount);
    _balancesInEth[msg.sender] = _balancesInEth[msg.sender] - ethAmount;
    _balancesInCtn[msg.sender] = _balancesInCtn[msg.sender] - ctnAmount;
  }

  function getPooledEthFunds(address owner) public returns (uint256 funds) {
    return _balancesInEth[owner];
  }

  function getPooledCtnFunds(address owner) public returns (uint256 funds) {
    return _balancesInCtn[owner];
  }

  function processEthToCtn(address recipient, uint256 ctnAmount, uint256 fees) public onlyExchange  {
    _addFees(fees);
    _cherryToken.transfer(recipient, ctnAmount);
  }

  function processCtnToEth(address recipient, uint256 ethAmount, uint256 fees) public onlyExchange {
    addFees(fees);
    recipient.transfer(ethAmount);
  }

  function addFees(uint256 _amount) private {
    _collectedFees = _collectedFees + amount;
  }

  modifier onlyExchange {
    require(msg.sender == address(cherrySwap), "The caller must be an exchange contract");
    _;
  }
}
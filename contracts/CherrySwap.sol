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
    require(msg.value <= cherryToken.balanceOf(address(this)), "not enough contract funds");
    // TODO: do computation magic here
    cherryToken.transferFrom(address(this), msg.sender, msg.value);
  }

  function ctnToEth(uint256 _amount) public {
    require(_amount > 0, "amount cannot be 0");
    require(_amount <= address(this).balance, "not enough contract funds");
    // TODO: do computation magic here
    cherryToken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(_amount);
  }

  function calculateExchangeRate(uint256 _amount, string token) public returns (uint256 exchangeRate) {
    // TODO
  }

  function calculateFees(uint256 _amount, string token) public returns (uint256 output) {
    // TODO
  }

  function calculateOutput(uint256 _amount, string token) private returns (uint256 output) {
    // TODO
  }
}
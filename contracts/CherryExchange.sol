pragma solidity ^0.5.0;

import "./CherryToken.sol";

contract CherryExchange {
  string public name = "CherryExchange";
  address public owner;
  CherryToken public cherryToken;

  constructor(CherryToken _cherryToken) public {
    cherryToken = _cherryToken;
    owner = msg.sender;
  }

  function () external payable {
    ethToCtn();
  }

  function ethToCtn() public payable {
    require(msg.value > 0, "amount cannot be 0");
    require(msg.value <= cherryToken.balanceOf(address(this)), "not enough contract funds");

    cherryToken.transferFrom(address(this), msg.sender, msg.value);
  }

  function ctnToEth(uint _amount) public {
    require(_amount > 0, "amount cannot be 0");
    require(_amount <= address(this).balance, "not enough contract funds");

    cherryToken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(_amount);
  }
}
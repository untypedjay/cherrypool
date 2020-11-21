pragma solidity 0.7.2;
using SafeMath for uint256;

library SafeMath {
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
  return a - b;
}

function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract CherryToken {
  string public constant name = "Cherry Token";
  string public constant symbol = "CTN";
  uint8 public constant decimals;

  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);

  mapping(address => uint256) balances;
  mapping(address => mapping(address => uint256)) allowed;

  uint _totalSupply;

  constructor(uint256 total) public {
    _totalSupply = total;
    balances[msg.sender] = _totalSupply;
  }

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address tokenOwner) public view returns (uint) {
    return balances[tokenOwner];
  }

  function transfer(address receiver, uint numTokens) public returns (bool success) {
    require(numTokens <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(numTokens);
    balances[receiver] = balances[receiver].add(numTokens);
    emit Transfer(msg.sender, receiver, numTokens);
    return true;
  }

  function approve(address delegate, uint value) public returns (bool) {
    allowed[msg.sender][delegate] = value;
    emit Approval(msg.sender, delegate, value);
    return true;
  }

  function allowance(address owner, address delegate) public view returns (uint) {
    return allowed[owner][delegate];
  }

  function transferFrom(address from, address to, uint value) public returns (bool success) {
    require(value <= balances[from]);
    require(value <= allowed[owner][msg.sender]);
    balances[from] = balances[from].sub(value);
    allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
    balances[to] = balances[to].add(value);
    Transfer(from, to, value);
    return true;
  }
}
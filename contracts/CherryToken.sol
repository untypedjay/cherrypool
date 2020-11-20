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

  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
  event Transfer(address indexed from, address indexed to, uint tokens);

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

  function transfer(address receiver, uint numTokens) public returns (bool) {
    require(numTokens <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(numTokens);
    balances[receiver] = balances[receiver].add(numTokens);
    emit Transfer(msg.sender, receiver, numTokens);
    return true;
  }

  function approve(address delegate, uint numTokens) public returns (bool) {
    allowed[msg.sender][delegate] = numTokens;
    emit Approval(msg.sender, delegate, numTokens);
    return true;
  }

  function allowance(address owner, address delegate) public view returns (uint) {
    return allowed[owner][delegate];
  }

  function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
    require(numTokens <= balances[owner]);
    require(numTokens <= allowed[owner][msg.sender]);
    balances[owner] = balances[owner].sub(numTokens);
    allowed[owner][msg.sender] = allowed[from][msg.sender].sub(numTokens);
    balances[buyer] = balances[buyer].add(numTokens);
    Transfer(owner, buyer, numTokens);
    return true;
  }
}
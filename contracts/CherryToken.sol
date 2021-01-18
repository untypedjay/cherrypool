pragma solidity ^0.5.0;

library SafeMath {
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);
    return c;
  }

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b, "SafeMath: multiplication overflow");

    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0, "SafeMath: division by zero");
    uint256 c = a / b;

    return c;
  }
}

contract CherryToken {
  using SafeMath for uint256;

  string private constant tokenName = "Cherry Token";
  string private constant tokenSymbols = "CTN";
  uint8 private constant tokenDecimals = 18;
  uint256 private totalTokenSupply;
  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) private allowed;

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor(uint256 total) public {
    totalTokenSupply = total;
    balances[msg.sender] = totalTokenSupply;
  }

  function name() public pure returns (string memory) {
    return tokenName;
  }

  function symbol() public pure returns (string memory) {
    return tokenSymbols;
  }

  function decimals() public pure returns (uint8) {
    return tokenDecimals;
  }

  function totalSupply() public view returns (uint256) {
    return totalTokenSupply;
  }

  function balanceOf(address owner) public view returns (uint256 balance) {
    return balances[owner];
  }

  function transfer(address to, uint256 value) public returns (bool success) {
    require(value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(value);
    balances[to] = balances[to].add(value);
    emit Transfer(msg.sender, to, value);
    return true;
  }

  function transferFrom(address from, address to, uint256 value) public returns (bool success) {
    require(value <= balances[from]);
    require(value <= allowed[from][msg.sender]);
    balances[from] = balances[from].sub(value);
    allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
    balances[to] = balances[to].add(value);
    emit Transfer(from, to, value);
    return true;
  }

  function approve(address spender, uint256 value) public returns (bool success) {
    allowed[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }

  function allowance(address owner, address spender) public view returns (uint256 remaining) {
    return allowed[owner][spender];
  }
}
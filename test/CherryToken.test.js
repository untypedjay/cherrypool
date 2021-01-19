const CherryToken = artifacts.require('CherryToken');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('CherryToken', ([owner, user]) => {
  let cherryToken;
  before(async () => {
    // load contract
    cherryToken = await CherryToken.new();
  });

  describe('CherryToken deployment', async () => {
    it('has a name', async () => {
      const name = await cherryToken.name();
      assert.equal(name, 'Cherry Token');
    });

    it('has a symbol', async () => {
      const symbol = await cherryToken.symbol();
      assert.equal(symbol, 'CTN');
    });

    it('has decimals', async () => {
      const decimals = await cherryToken.decimals();
      assert.equal(decimals, '18');
    });

    it('has totalSupply', async () => {
      const totalSupply = await cherryToken.totalSupply();
      assert.equal(totalSupply, '1000000000000000000000000');
    });

    it('has tokens', async () => {
      const balance = await cherryToken.balanceOf(owner);
      assert.equal(balance.toString(), tokens('1000000'));
    });
  });

  describe('CherryToken transfer', async () => {
    it('transfers tokens', async () => {
      await cherryToken.transfer(user, tokens('50'), { from: owner});
      const userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('50'));
    });

    it('transfers tokens from different account', async () => {

    });
  });

  describe('CherryToken allowance', async () => {
    it('adds allowance', async () => {
      let ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('0'));
      await cherryToken.approve(user, tokens('100'), { from: owner });
      ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('100'));
    });

    it('increases allowance', async () => {
      await cherryToken.approve(user, tokens('100'), { from: owner });
      let ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('100'));
      await cherryToken.increaseAllowance(user, tokens('20'), { from: owner });
      ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('120'));
    });

    it('decreases allowance', async () => {
      await cherryToken.approve(user, tokens('100'), { from: owner });
      let ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('100'));
      await cherryToken.decreaseAllowance(user, tokens('30'), { from: owner });
      ownerAllowsUser = await cherryToken.allowance(owner, user);
      assert.equal(ownerAllowsUser.toString(), tokens('70'));
    });
  });

  describe('CherryToken mint/burn', async () => {
    it('mints coins', async () => {
      let totalSupply = await cherryToken.totalSupply();
      assert.equal(totalSupply, tokens('1000000'));
      let userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('50'));
      await cherryToken.mint(user, tokens('100'));
      totalSupply = await cherryToken.totalSupply();
      assert.equal(totalSupply, tokens('1000100'));
      userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('150'));
    });

    it('burns coins', async () => {
      let totalSupply = await cherryToken.totalSupply();
      assert.equal(totalSupply, tokens('1000100'));
      let userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('150'));
      await cherryToken.burn(user, tokens('50'));
      totalSupply = await cherryToken.totalSupply();
      assert.equal(totalSupply, tokens('1000050'));
      userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('100'));
    });
  });
});
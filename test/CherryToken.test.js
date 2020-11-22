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
    // load contracts
    cherryToken = await CherryToken.new('1000000000000000000000000'); // 1 million tokens

    // send all CTN to exchange
    await cherryToken.transfer(owner, tokens('1000000'));
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

    it('transfers tokens', async () => {
      await cherryToken.transfer(user, tokens('50'), { from: owner});
      const userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('50'));
    });

    it('transfers tokens from', async () => {
      await cherryToken.transferFrom(owner, user, tokens('50'));
      const userBalance = await cherryToken.balanceOf(user);
      assert.equal(userBalance.toString(), tokens('100'));
    });
  });
});
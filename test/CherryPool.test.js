const CherryPool = artifacts.require('CherryPool');
const CherryToken = artifacts.require('CherryToken');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('CherryPool', ([owner, user]) => {
  let cherryToken;
  let cherryPool;
  before(async () => {
    // load contracts
    cherryToken = await CherryToken.new();
    cherryPool = await CherryPool.new(cherryToken.address);
  });

  describe('CherryPool deployment', async () => {
    it('has no collected fees yet', async () => {
      const collectedFees = await cherryPool.getCollectedFees();
      assert.equal(collectedFees, 0);
    });

    it('has no Ether balance yet', async () => {
      const ethBalance = await cherryPool.getEthBalance();
      assert.equal(ethBalance, 0);
    });

    it('has no CherryToken balance yet', async () => {
      const ctnBalance = await cherryPool.getCtnBalance();
      assert.equal(ctnBalance, 0);
    });
  });

  describe('CherryPool addLiquidity', async () => {
    it('adds liquidity', async () => {
      await cherryToken.transfer(user, tokens('20000'), { from: owner });
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('20000'));
      let ethBalance = await web3.eth.getBalance(user);
      assert.equal(ethBalance, tokens('100'));

      let pooledEth = await cherryPool.getPooledEthFunds(user);
      let pooledCtn = await cherryPool.getPooledCtnFunds(user);
      assert.equal(pooledEth, 0);
      assert.equal(pooledCtn, 0);

      await cherryToken.approve(cherryPool.address, tokens('1000'), { from: user });
      await cherryPool.addLiquidity.sendTransaction(tokens('1000'), { from: user, gas: 4000000, value: tokens('1')});

      pooledEth = await cherryPool.getPooledEthFunds(user);
      pooledCtn = await cherryPool.getPooledCtnFunds(user);
      assert.equal(pooledEth, tokens('1'));
      assert.equal(pooledCtn, tokens('1000'));

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19000'));
    });
  });

  describe('CherryPool removeLiquidity', async () => {
    it('rejects removal due to invalid reward', async () => {
      await cherryPool.removeLiquidity(tokens('1'), tokens('1000'), tokens('1'), { from: user }).should.be.rejected;
    });

    it('removes liquidity', async () => {
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19000'));

      let pooledEth = await cherryPool.getPooledEthFunds(user);
      let pooledCtn = await cherryPool.getPooledCtnFunds(user);
      assert.equal(pooledEth, tokens('1'));
      assert.equal(pooledCtn, tokens('1000'));

      await cherryPool.removeLiquidity(tokens('0.5'), tokens('500'), 0, { from: user });

      pooledEth = await cherryPool.getPooledEthFunds(user);
      pooledCtn = await cherryPool.getPooledCtnFunds(user);
      assert.equal(pooledEth, tokens('0.5'));
      assert.equal(pooledCtn, tokens('500'));

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19500'));
    });
  });
});
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
    await cherryToken.transfer(cherryPool.address, '1000000000000000000000'); // 1000 CTN
    await web3.eth.sendTransaction({ from: owner, to: cherryPool.address, value: web3.utils.toWei('1') });
  });

  describe('CherryPool deployment', async () => {
    it('has no rewards yet', async () => {
      const rewards = await cherryPool.getAvailableRewards();
      assert.equal(web3.utils.fromWei(rewards), 0);
    });

    it('has initial Ether pool', async () => {
      const ethBalance = await cherryPool.getEthBalance();
      assert.equal(web3.utils.fromWei(ethBalance), 1);
    });

    it('has initial CherryToken pool', async () => {
      const ctnBalance = await cherryPool.getCtnBalance();
      assert.equal(web3.utils.fromWei(ctnBalance), 1000);
    });
  });

  describe('CherryPool addLiquidity', async () => {
    it('adds liquidity', async () => {
      await cherryToken.transfer(user, tokens('20000'), { from: owner });
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('20000'));

      let liquidityTokenBalance = await cherryPool.getLiquidityTokenBalance(user);
      assert.equal(liquidityTokenBalance, 0);

      await cherryToken.approve(cherryPool.address, tokens('1000'), { from: user });
      await cherryPool.addLiquidity.sendTransaction(
        tokens('1000'),
        Math.sqrt(tokens('1'), tokens('1000')),
        { from: user, gas: 4000000, value: tokens('1')}
      );

      liquidityTokenBalance = await cherryPool.getLiquidityTokenBalance(user);
      assert.equal(liquidityTokenBalance, Math.sqrt(tokens('1'), tokens('1000')));

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19000'));
    });
  });

  describe('CherryPool removeLiquidity', async () => {
    it('rejects removal due to invalid reward', async () => {
      await cherryPool.removeLiquidity(
        tokens('1'),
        tokens('1000'),
        tokens('1'),
        { from: user }
      ).should.be.rejected;
    });

    it('removes liquidity', async () => {
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19000'));

      let liquidityTokenBalance = await cherryPool.getLiquidityTokenBalance(user);
      assert.equal(liquidityTokenBalance, Math.sqrt(tokens('1'), tokens('1000')));

      const totalEthPool = await cherryPool.getEthBalance();
      const totalCtnPool = await cherryPool.getCtnBalance();

      await cherryPool.removeLiquidity(
        tokens('0.5'),
        tokens('500'),
        Math.round(Math.sqrt(tokens('0.5'), tokens('500'))),
        Math.round(Math.sqrt(totalEthPool, totalCtnPool)),
        { from: user }
      );

      liquidityTokenBalance = await cherryPool.getLiquidityTokenBalance(user);
      const expectedLiquidityTokenBalance = Math.sqrt(tokens('1'), tokens('1000'))
        - Math.round(Math.sqrt(tokens('0.5'), tokens('500'))
      );
      assert.equal(liquidityTokenBalance.toString(), expectedLiquidityTokenBalance);

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance, tokens('19500'));
    });
  });

  describe('CherryPool swapEthToCtn', async () => {
    it('exchanges ETH to CTN', async () => {
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance.toString(), tokens('19500'));

      const ctnPool = await cherryPool.getCtnBalance();
      const ethPool = await cherryPool.getEthBalance();
      const ctnOutput = Math.round((web3.utils.fromWei(ctnPool) / web3.utils.fromWei(ethPool)));

      await cherryPool.swapEthToCtn.sendTransaction(
        tokens(ctnOutput.toString()),
        tokens('10'),
        { from: user, gas: 4000000, value: tokens('1')}
      );

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance.toString(), tokens('20500'));
    });
  });

  describe('CherryPool swapCtnToEth', async () => {
    it('exchanges CTN to ETH', async () => {
      let ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance.toString(), tokens('20500'));

      const ethPool = await cherryPool.getEthBalance();
      const ctnPool = await cherryPool.getCtnBalance();
      const ethOutput = Math.round((web3.utils.fromWei(ethPool) / web3.utils.fromWei(ctnPool)) * 50);

      await cherryToken.approve(cherryPool.address, tokens('50'), { from: user });
      await cherryPool.swapCtnToEth(tokens('50'), tokens(ethOutput.toString()), tokens('10'), { from: user });

      ctnBalance = await cherryToken.balanceOf(user);
      assert.equal(ctnBalance.toString(), tokens('20450'));
    });
  });
});
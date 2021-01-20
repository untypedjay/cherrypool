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
  });

  /*describe('CherryLiquidity getEthBalance', async () => {
    it('displays ETH balance', async () => {
      const ethBalance = await cherryLiquidity.getEthBalance();
      assert.equal(ethBalance.toString(), tokens('100'));
    });
  });

  describe('CherryLiquidity getCtnBalance', async () => {
    it('displays CTN balance', async () => {
      const ctnBalance = await cherryLiquidity.getCtnBalance();
      assert.equal(ctnBalance.toString(), tokens('100000'));
    });
  });*/
});
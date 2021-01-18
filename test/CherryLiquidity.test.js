/*const CherryLiquidity = artifacts.require('CherryLiquidity');
const CherryToken = artifacts.require('CherryToken');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('CherryLiquidity', ([owner, user]) => {
  let cherryToken;
  let cherryLiquidity;
  before(async () => {
    // load contracts
    cherryToken = await CherryToken.new('1000000000000000000000000'); // 1 million tokens
    cherryLiquidity = await CherryLiquidity.new(cherryToken.address, '100000000000000000000', '100000000000000000000000') // 100 ETH, 100000 CTN
  });

  describe('CherryLiquidity deployment', async () => {
    it('has a name', async () => {
      const name = await cherryLiquidity.name();
      assert.equal(name, 'CherryLiquidity');
    });
  });

  describe('CherryLiquidity getEthBalance', async () => {
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
  });
});*/
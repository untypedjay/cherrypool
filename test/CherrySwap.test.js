/*const CherryToken = artifacts.require('CherryToken');
const CherrySwap = artifacts.require('CherrySwap');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('CherrySwap', ([owner, user]) => {
  let cherryToken, cherrySwap;
  before(async () => {
    // load contracts
    cherryToken = await CherryToken.new('1000000000000000000000000'); // 1 million tokens
    cherrySwap = await CherrySwap.new(cherryToken.address);

    // send all CTN to exchange
    await cherryToken.transfer(cherrySwap.address, tokens('1000000'));
  });

  describe('CherryToken deployment', async () => {
    it('has a name', async () => {
      const name = await cherryToken.name();
      assert.equal(name, 'Cherry Token');
    });
  });

  describe('CherrySwap deployment', async () => {
    it('has a name', async () => {
      const name = await cherrySwap.name();
      assert.equal(name, 'CherrySwap');
    });

    it('has tokens', async () => {
      const balance = await cherryToken.balanceOf(cherrySwap.address);
      assert.equal(balance.toString(), tokens('1000000'));
    });
  });

  describe('Exchange ETH for CTN', async () => {
    /*it('swaps ETH to CTN', async () => {
      const userCtnBalanceBefore = await cherryToken.balanceOf(user);
      const exchangeCtnBalanceBefore = await cherryToken.balanceOf(cherrySwap.address);
      assert.equal(userCtnBalanceBefore.toString() , '0', 'user CTN balance correct before swapping');
      assert.equal(exchangeCtnBalanceBefore.toString(), tokens('1000000'), 'exchange CTN balance correct before swapping');

      await cherrySwap.ethToCtn({ from: user, value: web3.utils.toWei('50', 'ether')});

      const userCtnBalanceAfter = await cherryToken.balanceOf(user);
      const exchangeCtnBalanceAfter = await cherryToken.balanceOf(cherrySwap.address);
      assert.equal(userCtnBalanceAfter.toString(), tokens('50'), 'user CTN balance correct after swapping');
      assert.equal(exchangeCtnBalanceAfter.toString(), tokens('99950'), 'exchange CTN balance correct after swapping');
    });*/
 /* });

  describe('Exchange CTN for ETH', async () => {

  });
});*/
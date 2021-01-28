const CherryToken = artifacts.require('CherryToken')
const CherryPool = artifacts.require('CherryPool');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CherryToken);
  const cherryToken = await CherryToken.deployed();

  await deployer.deploy(CherryPool, cherryToken.address);
  const cherryPool = await CherryPool.deployed();

  await cherryToken.transfer(cherryPool.address, '1000000000000000000000'); // 1000 CTN
  await web3.eth.sendTransaction({ from: accounts[0], to: cherryPool.address, value: web3.utils.toWei('1') });
};



const CherryToken = artifacts.require('CherryToken')
const CherrySwap = artifacts.require('CherrySwap');
const CherryLiquidity = artifacts.require('CherryLiquidity');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CherryToken);
  const cherryToken = await CherryToken.deployed();

  /*await deployer.deploy(CherrySwap, cherryToken.address);
  const cherrySwap = await CherrySwap.deployed();

  await deployer.deploy(CherryLiquidity, cherryToken.address, '100000000000000000000', '100000000000000000000000');

  await cherryToken.transfer(cherrySwap.address, '1000000000000000000000000');*/
};

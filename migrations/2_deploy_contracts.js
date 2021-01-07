const CherryToken = artifacts.require('CherryToken')
const CherrySwap = artifacts.require('CherrySwap');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CherryToken, '1000000000000000000000000');
  const cherryToken = await CherryToken.deployed();

  await deployer.deploy(CherrySwap, cherryToken.address);
  const cherrySwap = await CherrySwap.deployed();

  await cherryToken.transfer(cherrySwap.address, '1000000000000000000000000');
};

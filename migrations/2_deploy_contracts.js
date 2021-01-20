const CherryToken = artifacts.require('CherryToken')
const CherryPool = artifacts.require('CherryPool');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CherryToken);
  const cherryToken = await CherryToken.deployed();

  await deployer.deploy(CherryPool, cherryToken.address);
};

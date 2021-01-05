const CherryToken = artifacts.require('CherryToken')
const CherryExchange = artifacts.require('CherryExchange');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CherryToken);
  const cherryToken = await CherryToken.deployed();

  await deployer.deploy(CherryExchange, cherryToken.address);
  const cherryExchange = await CherryExchange.deployed();

  await cherryToken.transfer(cherryExchange.address, '1000000000000000000000000');
};

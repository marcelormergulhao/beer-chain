// migrating the appropriate contracts
var BreweryRole = artifacts.require("./BreweryRole.sol");
var FarmerRole = artifacts.require("./FarmerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var SupermarketRole = artifacts.require("./SupermarketRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(BreweryRole);
  deployer.deploy(FarmerRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(SupermarketRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};

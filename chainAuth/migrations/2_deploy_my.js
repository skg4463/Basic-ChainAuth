const My = artifacts.require("./chainAuth.sol");

module.exports = function(deployer) {
  deployer.deploy(My);
};

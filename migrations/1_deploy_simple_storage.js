const SimpleStorage = artifacts.require("ToDos");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};

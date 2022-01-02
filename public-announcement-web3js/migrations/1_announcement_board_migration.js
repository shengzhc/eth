var AnnouncementBoard = artifacts.require("AnnouncementBoard");

module.exports = function(deployer) {
  deployer.deploy(AnnouncementBoard, 10);
};

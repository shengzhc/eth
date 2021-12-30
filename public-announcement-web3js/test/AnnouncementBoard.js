const assert = require("assert");

const AnnouncementBoard = artifacts.require("AnnouncementBoard");

describe("AnnouncementBoard contract", function () {
  let accounts;

  before(async function () {
    accounts = await web3.eth.getAccounts();
  });

  describe("Contract Deployment", function () {
    it("Deploy with the right default values", async function () {
      const board = await AnnouncementBoard.new(3);
      assert.equal(await board.getAnnouncementsCount(), 0);
    });
  });

  describe("Contract announce & takedown", function () {
    
  });
});
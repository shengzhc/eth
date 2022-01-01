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
    it("Announce should increase the number", async function () {
      const board = await AnnouncementBoard.new(3);
      await board.announce("1st Publishment");
      assert.equal(await board.getAnnouncementsCount(), 1);
    });

    it("Announce multiple shouldn't exceed maximum", async function () {
      const board = await AnnouncementBoard.new(3);
      await board.announce("1st Publishment");
      await board.announce("2nd Publishment");
      await board.announce("3rd Publishment");
      try {
        await board.announce("4th Publishment");
      } catch (_) {}
      assert.equal(await board.getAnnouncementsCount(), 3);
    });
    
    it("Takedown should decrease the number", async function () {
    });
  });
});
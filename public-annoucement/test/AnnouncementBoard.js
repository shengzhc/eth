const { expect } = require("chai");
const { ethers } = require("hardhat");
const abi = require("../artifacts/contracts/AnnouncementBoard.sol/AnnouncementBoard.json");

describe("AnnouncementBoard contract", function () {
  it("Deployment should have default 0 counters", async function () {
    const AnnouncementBoard = 
      await ethers.getContractFactory("AnnouncementBoard");
    const board = await AnnouncementBoard.deploy(3);
    await board.deployed();
    expect((await board.getAnnouncementsCount()).toNumber()).to.eq(0);
  });

  it(
    "Deployment should increase cnt after successfully announce", 
    async function () {
      const AnnouncementBoard = 
        await ethers.getContractFactory("AnnouncementBoard");
      const board = await AnnouncementBoard.deploy(3);
      await board.deployed();
      const txAnnounce = await board.announce("1st Announcement");
      await txAnnounce.wait();
      expect((await board.getAnnouncementsCount()).toNumber()).to.eq(1);
    }
  );

  it(
    "Deployment should not exceed max announcements", 
    async function () {
      const AnnouncementBoard = 
        await ethers.getContractFactory("AnnouncementBoard");
      const board = await AnnouncementBoard.deploy(3);
      await board.deployed();
      try {
        await (await board.announce("1st Announcement")).wait();
        await (await board.announce("2nd Announcement")).wait();
        await (await board.announce("3rd Announcement")).wait();
        await (await board.announce("4th Announcement")).wait();
      } catch (_) {
      }
      expect((await board.getAnnouncementsCount()).toNumber()).to.eq(3);
    }
  );

  it(
    "Deployment announce and takedown should match expected values",
    async function () {
      const AnnouncementBoard = 
        await ethers.getContractFactory("AnnouncementBoard");
      const board = await AnnouncementBoard.deploy(10);
      await board.deployed();
      const firstReceipt = await (await board.announce("1st Announcement")).wait();
      const firstEvent = firstReceipt.events.find(function (el) {
        return el.event == 'Announce';
      });
      console.log(firstEvent);
      ethers.utils.defaultAbiCoder.decode(["address", "uint"], firstEvent.data);
    }
  )
});
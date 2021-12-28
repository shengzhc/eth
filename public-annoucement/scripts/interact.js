const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("ethers");
const abi = require("../artifacts/contracts/AnnouncementBoard.sol/AnnouncementBoard.json");

const provider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const sc = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);

async function main() {
    const announcements = await sc.announcements(0);
    console.log("The message is " + announcements);
    // console.log("Updating the message...");
    // const tx = await sc.announce('1. Public Announcement')
    // await tx.wait();
    // console.log("Announcement has been updated.");
    // const tx = await sc.update("This is the new message.");
    // await tx.wait();
    // console.log("Message has been updated...");
    // message = await sc.message();
    // console.log("Updated message is " + message);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
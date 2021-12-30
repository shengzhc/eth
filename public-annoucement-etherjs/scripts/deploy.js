async function main() {
    const AnnouncementBoard = await ethers.getContractFactory("AnnouncementBoard");
 
    // Start deployment, returning a promise that resolves to a contract object
    const announcement_board = await AnnouncementBoard.deploy(10);   
    console.log("Contract deployed to address:", announcement_board.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
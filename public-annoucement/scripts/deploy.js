async function main() {
    const AnnoucementBoard = await ethers.getContractFactory("AnnoucementBoard");
 
    // Start deployment, returning a promise that resolves to a contract object
    const annoucement_board = await AnnoucementBoard.deploy("Hello World!");   
    console.log("Contract deployed to address:", annoucement_board.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
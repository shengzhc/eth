import AnnouncementBoard from '../contracts/AnnouncementBoard.json';

const scAddress = "0x8766D1D0c82704C6Dff2E235CF76e348a8d2D128";
const scABI = AnnouncementBoard.abi;

declare global {
  interface Window {
    ethereum: any;
  }
}

export default class ETHSession {
  isWalletConnected(): boolean {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("make sure you have metamask installed!");
      return false;
    } else {
      console.log("Wallet exists! We're ready to go!");
      return true;
    }
  }

  async connectWalletIfNeeded(): Promise<string | null> {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install Metamask Extensions!");
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length !== 0) {
      return accounts[0];
    } else {
      alert("No authorized account found");
      return null;
    }
  }
}
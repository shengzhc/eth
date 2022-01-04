import Announcement from '../models/Announcement';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const contractAddress = "0x8766D1D0c82704C6Dff2E235CF76e348a8d2D128";
const { abi } = require('../contracts/AnnouncementBoard.json');

declare global {
  interface Window {
    ethereum: any;
  }
}

export default class ETHSession {
  private accountAddress?: string;
  private web3?: Web3;
  private contract?: Contract;

  getAccountAddress(): string | undefined {
    return this.accountAddress;
  }

  async connectWalletIfNeeded(): Promise<boolean> {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install Metamask Extensions!");
      return false;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      alert("No authorized account found");
      return false;
    }

    this.accountAddress = accounts[0];
    this.web3 = new Web3(ethereum);
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
    return true;
  }

  async loadAnnouncements(): Promise<Array<Announcement>> {
    if (!this.contract || !this.web3) {
      return [];
    }

    let ret = await this.contract.methods.getAliveAnnouncements().call();
    console.log(ret);
    return [];
  }
}
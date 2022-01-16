import Announcement from '../models/Announcement';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const contractAddress = "0x2762034f0a8c7f0b32196F0063fB21e64633afe6";
const { abi } = require('../contracts/AnnouncementBoard.json');

declare global {
  interface Window {
    ethereum: any;
  }
}

// Having some troubles configuring TS with Webpack, so instead of using ? on
// optional properties, checking the nullability first.
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

  addUpdateListener(listener: (nItem: Announcement) => void) {
    if (!this.contract) {
      return;
    }

    this.contract.events.Announce({})
      .on(
        'data', 
        function(event: any) {
          const ret = event.returnValues;
          if (ret) {
            listener(new Announcement(ret[0], ret[1], ret[2]));
          }
        }
      )
      .on(
        'changed', 
        function(event: any) {
          console.log(event);
        }
      )
      .on('error', console.error);
  }

  addRemoveListener(listener: (nonce: number) => void) {
    if (!this.contract) {
      return;
    }

    this.contract.events.Takedown({})
      .on(
        'data', 
        function(event: any) {
          const ret = event.returnValues;
          console.log(event);
          if (ret) {
            console.log(ret);
          }
        }
      )
      .on(
        'changed', 
        function(event: any) {
          console.log(event);
        }
      )
      .on('error', console.error);
  }

  async loadAnnouncements(): Promise<Array<Announcement>> {
    if (!this.contract || !this.web3) {
      return [];
    }

    const anonuncements = new Array<Announcement>();
    const ret = await this.contract.methods.getAliveAnnouncements().call();
    for (var idx = 0; idx < ret[0].length && idx < ret[1].length && idx < ret[2].length; idx ++) {
      anonuncements.push(
        new Announcement(ret[0][idx], ret[1][idx], ret[2][idx])
      );
    }
    return anonuncements;
  }

  async announce(content: string): Promise<boolean> {
    if (!this.contract || !this.web3 || !this.accountAddress) {
      return false;
    }

    const tx =
      await this.contract
        .methods
        .announce(content)
        .send({ from: this.accountAddress });
    return tx ? true : false;
  }

  async remove(nonce: number): Promise<boolean> {
    if (!this.contract || !this.web3 || !this.accountAddress) {
      return false;
    }

    const tx = 
      await this.contract
        .methods
        .takedown(nonce)
        .send({ from: this.accountAddress });
    return tx ? true : false;
  }
}
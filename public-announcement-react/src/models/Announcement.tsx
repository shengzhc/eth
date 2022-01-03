export default class Announcement {
  public readonly addr: string;
  public readonly content: string;
  public readonly nonce: number;

  constructor(addr: string, content: string, nonce: number) {
    this.addr = addr;
    this.content = content;
    this.nonce = nonce;
  }
}
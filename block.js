const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(data, index, timestamp = String(new Date()), previousHash = '') {
        this.data = data;
        this.index = index;
        this.timestamp = timestamp.slice(0, 24);
        this.previousHash = previousHash;
  
      this.hash = this.calculateHash();
    }
  
    calculateHash() {
      return SHA256(JSON.stringify(this.data) + this.index + this.timestamp + this.previousHash + this.nonce).toString();
    }
  }
class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    createGenesisBlock() {
      const genesisDate = '04/07/1999';
      return new Block('Genesis Block', 0, genesisDate, '0');
    }
  
    getLastBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    addNewBlock(newBlock) {
      newBlock.previousHash = this.getLastBlock().hash;
      newBlock.index = this.getLastBlock().index + 1;
      this.chain.push(newBlock);
    }
  
  isChainValid() {
    const chain = this.chain;
    for (let i = 0; i < chain.length; i++) {

      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`Block -- ${i} -- corrupted`);
        return false;
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`Block -- ${i - 1} -- corrupted`);
        return false;
      }
    }
    console.log('\n\nChain Valid');
    return true;
  }
}
  
  let blocksToAdd = 5;
  
  const Chain = new Blockchain();
  
  for (let i = 0; i < blocksToAdd; i++) {
    Chain.addNewBlock(new Block({sender: 'Neha', receiver: 'Mark', message: `Block ${Chain.chain.length} has been added to the chain`}));
    console.log(Chain.chain[i]);
  }
  console.log(Chain.isChainValid());
  

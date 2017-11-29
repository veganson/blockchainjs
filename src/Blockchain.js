import Block from './Block';

class Blockchain {
  constructor(chain, difficulty = 1) {
    this.difficulty = difficulty;
    this.chain = chain || [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const genesisBlock = new Block(
      0,
      '01/01/2017',
      'genesis block',
      '0',
    );

    genesisBlock.mineBlock(this.difficulty);

    return genesisBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(blockData) {
    const prevBlock = this.getLatestBlock();
    const newBlock = new Block(
      prevBlock.index + 1,
      Date.now(),
      blockData,
      prevBlock.hash,
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;

const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NftMarketplace", function () {
  let owner;
  let myNFTContract;

  before(async function () {
    [owner] = await ethers.getSigners();
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
    myNFTContract = await NftMarketplace.deploy();
    await myNFTContract.deployed();
  });

  it("Should mint a new NFT", async function () {
    await myNFTContract.connect(owner).mint();
    const totalSupply = await myNFTContract.totalSupply();
    expect(totalSupply).to.equal(1);
  });

  // Add more test cases as needed

});
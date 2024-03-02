const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NftMarketplace2", function () {
  let owner, addr1;
  let myNFTContract;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    myNFTContract = await hre.ethers.deployContract("NftMarketplace2");
    await myNFTContract.waitForDeployment();
    console.log(`Contract deployed to ${myNFTContract.target}`);
  });

  describe("Mint NFT", async function () {
    it("Should increase minter balance", async function () {
      await myNFTContract.connect(owner).mint();
      await myNFTContract.connect(owner).mint();
      const minterBalance = await myNFTContract.balanceOf(owner.address);
      expect(2).to.equal(minterBalance);
    });
  });

  describe("Sell NFT", async function () {
    it("Holder should transfer NFT ownership to contract", async function () {
      const ethAmount = ethers.parseUnits("0.000001", 18);
      await myNFTContract.connect(owner).sell(0, ethAmount);
      let newOwner = await myNFTContract.ownerOf(0);
      expect(myNFTContract.target).to.equal(newOwner);
    });

    it("NFT should have a price", async function () {
      const ethAmount = ethers.parseUnits("0.000001", 18);
      const tokenPrice = await myNFTContract.tokenPrice(0);
      console.log(`Token Price: ${tokenPrice}`);
      expect(tokenPrice).to.equal(ethAmount);
    });
  });

  describe("Buy NFT", async function () {
    it("Buyer should own the NFT", async function () {
      const balance = await ethers.provider.getBalance(addr1.address);
      console.log(`Address Balance: ${balance}`);
      await myNFTContract.connect(addr1).buy(0, { value: ethers.parseUnits("1", 18) });
      let newOwner = await myNFTContract.ownerOf(0);
      expect(addr1.address).to.equal(newOwner);
    });
  });

  // Add more test cases as needed

});
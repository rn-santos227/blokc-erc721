const { ethers } = require("hardhat");

async function main() {
  const [ owner ] = await ethers.getSigners();
  const myNFTContract = await await hre.ethers.deployContract("NftMarketplace");
  await myNFTContract.waitForDeployment();

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});


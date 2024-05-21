import { ethers} from "hardhat";

async function main() {
    const NFTMarket = await ethers.getContractFactory("NFT");
    const nftMarketInstance = await NFTMarket.deploy();
    console.log("Deployed to: ", nftMarketInstance.getAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
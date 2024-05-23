import { ethers} from "hardhat";

async function main() {
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarketInstance = await NFTMarket.deploy();
    const address = await nftMarketInstance.getAddress().then((res) => {
      console.log(res)
    });
    console.log("Deployed to: ", address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
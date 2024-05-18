
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { EventLog } from "ethers";
import hre from "hardhat";

describe("NFTMarket", () => {
    it("Mint nft test", async () => {
        const NFTMarket = await hre.ethers.getContractFactory("NFT");
        const nftMarketInstance = await NFTMarket.deploy();

        // Call the creta NFT function
        const tokenURI = 'https://example-token.uri/';
        const transaction = await nftMarketInstance.createNFT(tokenURI);
        const receipt = await transaction.wait();

        // Get token id from events
        const tokenID = (receipt?.logs[0] as EventLog).args[2];
        const mintedTokenURI = await nftMarketInstance.tokenURI(tokenID);

        // Get owner of newly created nft
        const ownerAddress = await nftMarketInstance.ownerOf(tokenID);
        const signers = await hre.ethers.getSigners();
        const currAddress = await signers[0].getAddress();

        // Assert
        expect(mintedTokenURI).to.equal(tokenURI);
        expect(ownerAddress).to.equal(currAddress);
    })
})

// describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//         const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//         expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//         const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//         expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//         const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//         );

//         expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//         );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//         // We don't use the fixture here because we want a different deployment
//         const latestTime = await time.latest();
//         const Lock = await hre.ethers.getContractFactory("Lock");
//         await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//         );
//     });
// });
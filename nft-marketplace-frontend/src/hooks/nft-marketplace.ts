import { Contract, ethers, Signer } from "ethers";
import useSigner from "../components/signer/signer-context";
import NFT_MARKETPLACE from '../contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../contracts/NFTMarket.sol/NFT.json'

const NFT_MARKET_ADDRESS= '0x18C1481f4533acfdf2D36A495C9a342754A3795c'

const useNFTMarketplace = () => {
    const {signer } = useSigner();

    const nftMarketplace = new Contract(NFT_MARKET_ADDRESS, NFT_MARKETPLACE.abi, signer as unknown as Signer);

    // listNFT(address tokenAddress, uint256 tokenID, uint256 price)
    const listNFT = async (tokenAddress: string, tokenId: string, price: number) => {
        try {
            const nftMarket = new Contract(tokenAddress, NFT.abi, signer as unknown as Signer);
            const transaction = await nftMarket.approve(NFT_MARKET_ADDRESS, tokenId);
            transaction.wait();

            const transaction2 = await nftMarketplace.listNFT(tokenAddress, tokenId, ethers.parseEther(price.toString()));
            transaction2.wait();
          } catch (error) {
            console.log(error);
          }  
    }

    // buyNFT(address tokenAddress, uint tokenID)
    const buyNFT = async (tokenAddress: string, tokenId: string, price: number) => {
        try {
            const transaction = await nftMarketplace.buyNFT(tokenAddress, tokenId, {value: price.toString()});
            transaction.wait();
          } catch (error) {
            console.log(error);
          }  
    }

    // cancelListing(address tokenAddress, uint256 tokenID)
    const cancelListNFT = async (tokenAddress: string, tokenId: string) => {
        try {
            const transaction = await nftMarketplace.cancelListing(tokenAddress, tokenId);
            transaction.wait();
          } catch (error) {
            console.log(error);
          }
    }

    return {listNFT, buyNFT, cancelListNFT};
}

export default useNFTMarketplace;
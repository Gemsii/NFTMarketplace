import { Contract, Signer } from "ethers";
import useSigner from "../components/signer/signer-context";
import { TransactionResponse } from "@ethersproject/providers";
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
            const transaction: TransactionResponse = await nftMarket.approve(NFT_MARKET_ADDRESS, tokenId);
            transaction.wait();

            const transaction2: TransactionResponse = await nftMarketplace.listNFT(tokenAddress, tokenId, price);
            console.log(transaction2);      

            //return resData.IpfsHash;
          } catch (error) {
            console.log(error);
          }  
    }

    return {listNFT};
}

export default useNFTMarketplace;
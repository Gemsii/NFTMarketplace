import { NFTTransferEvent as NFTTransferEventEvent } from "../generated/NFTMarket/NFTMarket"
import { NFT } from "../generated/schema"
import { NFT as NFTContract} from "../generated/NFT/NFT"

export function handleNFTTransferEvent(event: NFTTransferEventEvent): void {
  
  const nft = new NFT(event.params.tokenAddress.toHex() + "-" + event.params.tokenID.toString());

  nft.tokenAddress = event.params.tokenAddress;
  nft.tokenID = event.params.tokenID;
  nft.from = event.params.from;
  nft.to = event.params.to;
  nft.price = event.params.price;

  const nftContract = NFTContract.bind(event.params.tokenAddress);
  const tokenURI = nftContract.tokenURI(event.params.tokenID);

  nft.tokenURI = tokenURI;

  nft.save()
}
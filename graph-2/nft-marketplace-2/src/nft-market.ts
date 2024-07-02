import { NFT } from "../generated/schema"
import {
  NFTMarket,
  NFTTransferEvent,
} from "../generated/NFTMarket/NFTMarket"
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

export function handleNFTTransferEvent(event: NFTTransferEvent): void {
  let nft = new NFT(
    event.params.tokenID.toString()
  )
  nft.tokenAddress = event.params.tokenAddress
  nft.to = event.params.to;
  nft.from = event.params.from;
  nft.price = event.params.price;

  //const nftMarket = NFTMarket.bind(event.address);
  //const tokenURI = nftMarket.tokenURI(event.params.tokenID);
  const tokenURI = IERC721(event.params.tokenAddress).tokenURI(event.params.tokenID);
  
  nft.tokenURI = tokenURI;

  nft.save()
}

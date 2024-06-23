import { Grid } from "@mui/material";
import { Network, Alchemy, OwnedNft } from 'alchemy-sdk';
import useSigner from "../signer/signer-context";
import { useEffect, useState } from "react";
import NFTCard from "../nft-card/nft-card";

const settings = {
  apiKey: "rjq215KiFGI__m7O_iy9i5I7Ah7JUs4j",
  network: Network.ETH_SEPOLIA,
};

function CollectionContainer() {
    const alchemy = new Alchemy(settings);
    const {address} = useSigner();    
    const [nfts, setNfts] = useState<OwnedNft[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        const getOwnersNFTs = async () => {
            if(address && !isLoaded){
                const nfts = await alchemy.nft.getNftsForOwner(address);
                if(nfts.totalCount  > 0) {
                    setNfts(nfts.ownedNfts)
                }
                setIsLoaded(true);
            }           
        };
    
        getOwnersNFTs();
    }, [address, alchemy.nft, isLoaded])

    const handleOnBuyNFT = (nft: OwnedNft) => {
      console.log(nft)
    }
    
    return (
        <Grid container alignSelf={'center'} spacing={3} sx={{paddingInline: '10rem', paddingTop: '4rem', width: '90rem'}}>
        {nfts.map((nft, index) => (
          <Grid item key={index} xs={3}>
            <NFTCard nft={nft} key={index} onBuyClick={handleOnBuyNFT}/>
          </Grid>
        ))}
      </Grid>
    );
}

export default CollectionContainer;
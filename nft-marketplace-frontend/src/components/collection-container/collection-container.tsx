import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Network, Alchemy, OwnedNft } from 'alchemy-sdk';
import useSigner from "../signer/signer-context";
import { useEffect, useState } from "react";

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
    
    return (
        <Grid container spacing={3}>
        {nfts.map((nft, index) => (
          <Grid item key={index}>
            <Card>
              <CardMedia
                component="img"
                image={nft.tokenUri}
              />
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
}

export default CollectionContainer;
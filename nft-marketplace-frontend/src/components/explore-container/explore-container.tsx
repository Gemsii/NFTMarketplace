import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import NFTCard, { NFT } from "../nft-card/nft-card";
import useNFTMarketplace from "../../hooks/nft-marketplace";
import useSigner from "../signer/signer-context";

function ExploreContainer() {
    const [listedNFs, setListedNFTs] = useState<NFT[]>([]);
    const { buyNFT } = useNFTMarketplace();
    const {address} = useSigner();    


    const fetchNFTs = async () => {
        const response = await fetch('https://api.studio.thegraph.com/query/79753/nft-marketplace-2/v0.0.1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: `
            {
                nfts(where: { to: "0x18C1481f4533acfdf2D36A495C9a342754A3795c", from_not: "${address}"} ) {
                    id
                    tokenAddress
                    tokenID
                    from
                    to
                    price
                    tokenURI
                }
            }
            ` }),
        });

      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        const data = await response.json();

        if(data.data?.nfts){
          const nfts: NFT[] = data.data.nfts.map((nft: any) => ({
            tokenUri: nft.tokenURI,
            tokenId: nft.tokenID as number,
            price: nft.price,
            tokenAddress: nft.tokenAddress
          }));

          setListedNFTs(nfts);
        }
    };

    useEffect(() => {
        fetchNFTs()   
    }, [])

    const handleOnBuyNFT = async (nft: any) => {
        await buyNFT(nft.tokenAddress, nft.tokenId, nft.price);
      }
      
    return (
        <Grid container alignSelf={'center'} spacing={3} sx={{paddingInline: '10rem', paddingTop: '4rem', width: '90rem'}}>
        {listedNFs?.map((nft, index) => (
          <Grid item key={index} xs={3}>
            <NFTCard nft={nft} key={index} onBuyClick={handleOnBuyNFT}/>
          </Grid>
        ))}
      </Grid>
    );
}

export default ExploreContainer;
import { Card, CardMedia, CardContent, Stack, Typography, Button } from "@mui/material";
import { OwnedNft } from "alchemy-sdk";
import { ethers } from "ethers";

export type NFT = {
  tokenUri: string;
  tokenId: string;
  price: number;
  tokenAddress: string;
}

interface NFTCardProps {
    nft: OwnedNft | NFT;
    key: number;
    onBuyClick?: (nft: NFT) => void;
    onListClick?: (nft: OwnedNft) => void;
    onCancelClick?: (nft: NFT) => void;
}

function NFTCard(props: Readonly<NFTCardProps>) {
    const {nft} = props;

    return (
        <Card sx={{width: '256px', height: '340px', background: 'radial-gradient(ellipse at center, #551967 0%, #241F2C 100%)', border: '1px solid #E350FF', borderRadius: '5px'}}>
              <CardMedia
                component="img"
                image={nft.tokenUri}
                sx={{margin: '17px', width: '222px', borderRadius: '5px', overflow: 'hidden', background: '#ffffff', height: '224px'}}
              />
              <CardContent sx={{height: '4.5rem', paddingBlock: '0px'}}>
                <Stack>
                  <Stack alignItems={'flex-start'} marginTop={'-0.2rem'}>
                    <Typography sx={{lineHeight: '24px', fontSize: '16px', color: '#ffffff'}}>Creature #{nft.tokenId}</Typography>
                  </Stack>
                  <Stack alignItems={'flex-start'} flexDirection={'row'} paddingTop={'0.7rem'} gap={2}>
                    <Stack flexGrow={1} minWidth={0}>
                      {(props.onBuyClick || props.onCancelClick) && (
                        <>
                            <Typography sx={{display: 'flex', lineHeight: '15px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)'}}>Current price:</Typography>
                            {(nft as NFT)?.price && (<Typography sx={{display: 'flex', lineHeight: '22px', fontSize: '16px', fontWeight: '600', background: 'linear-gradient(90deg, #E350FF 0%, #883099 100%)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent', width:'120px'}}>{ethers.formatEther((nft as NFT)?.price)} ETH</Typography>)}
                        </>
                      )}
                    </Stack>
                    {props.onBuyClick && (
                        <Button onClick={() => props.onBuyClick && props.onBuyClick(props.nft as NFT)} sx={{border: '1px solid #883099', borderRadius: '5px', width: '85px', height: '35px', color: '#FFFFFF', textTransform: 'none'}}>Buy now</Button>
                    )}
                    {props.onListClick && (
                        <Button onClick={() => props.onListClick && props.onListClick(props.nft as OwnedNft)} sx={{border: '1px solid #883099', borderRadius: '5px', width: '90px', height: '35px', color: '#FFFFFF', textTransform: 'none'}}>List NFT</Button>
                    )}
                    {props.onCancelClick && (
                        <Button onClick={() =>props.onCancelClick  && props.onCancelClick (props.nft as NFT)} sx={{border: '1px solid #883099', borderRadius: '5px', width: '100px', height: '35px', color: '#FFFFFF', textTransform: 'none'}}>Cancel List</Button>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
    )
}

export default NFTCard;
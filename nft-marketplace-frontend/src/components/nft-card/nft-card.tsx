import { Card, CardMedia, CardContent, Stack, Typography, Button } from "@mui/material";
import { OwnedNft } from "alchemy-sdk";

interface NFTCardProps {
    nft: OwnedNft;
    key: number;
    onBuyClick?: (nft: OwnedNft) => void;
    onListClick?: () => void;
}

function NFTCard(props: Readonly<NFTCardProps>) {
    const {nft, key} = props;

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
                    <Typography sx={{lineHeight: '24px', fontSize: '16px', color: '#ffffff'}}>Creature #{key}</Typography>
                  </Stack>
                  <Stack alignItems={'flex-start'} flexDirection={'row'} paddingTop={'0.7rem'}>
                    <Stack flexGrow={1}>
                      {props.onBuyClick && (
                        <>
                            <Typography sx={{display: 'flex', lineHeight: '15px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)'}}>Current price:</Typography>
                            <Typography sx={{display: 'flex', lineHeight: '22px', fontSize: '16px', fontWeight: '600', background: 'linear-gradient(90deg, #E350FF 0%, #883099 100%)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent'}}>14 ETH</Typography>
                        </>
                      )}
                    </Stack>
                    {props.onBuyClick && (
                        <Button onClick={() => props.onBuyClick && props.onBuyClick(props.nft)} sx={{border: '1px solid #883099', borderRadius: '5px', width: '85px', height: '35px', color: '#E350FF', textTransform: 'none'}}>Buy now</Button>
                    )}
                    {props.onListClick && (
                        <Button onClick={props.onListClick} sx={{border: '1px solid #883099', borderRadius: '5px', width: '90px', height: '35px', color: '#E350FF', textTransform: 'none'}}>List NFT</Button>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
    )
}

export default NFTCard;
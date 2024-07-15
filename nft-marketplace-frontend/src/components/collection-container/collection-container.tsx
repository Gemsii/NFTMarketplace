import { Button, Dialog, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Network, Alchemy, OwnedNft } from 'alchemy-sdk';
import useSigner from "../signer/signer-context";
import { useEffect, useState } from "react";
import NFTCard from "../nft-card/nft-card";
import CloseIcon from '@mui/icons-material/Close';
import useNFTMarketplace from "../../hooks/nft-marketplace";
const settings = {
  apiKey: "rjq215KiFGI__m7O_iy9i5I7Ah7JUs4j",
  network: Network.ETH_SEPOLIA,
};

function CollectionContainer() {
    const alchemy = new Alchemy(settings);
    const {signer, address} = useSigner();    
    const [nfts, setNfts] = useState<OwnedNft[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState<OwnedNft | null>(null);
    const [priceValue, setPriceValue] = useState<number>(0);
    const { listNFT } = useNFTMarketplace();

    
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

    const handleOnListNFT = (nft: OwnedNft) => {
      setSelectedNFT(nft);
    }

    const onSubmit = async () => {
        if(selectedNFT !== null){
            console.log(selectedNFT)
            await listNFT(selectedNFT.contract.address, selectedNFT.tokenId, priceValue);
            setSelectedNFT(null);
            setPriceValue(0);
        }
    };

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setPriceValue(value as unknown as number);
    };
    
    return (
      <Grid container alignSelf={'center'} spacing={3} sx={{paddingInline: '10rem', paddingTop: '4rem', width: '90rem'}}>
        {nfts.map((nft, index) => (
          <Grid item key={index} xs={3}>
            <NFTCard nft={nft} key={index} onListClick={handleOnListNFT}/>
          </Grid>
        ))}
        <Dialog open={selectedNFT !== null} onClose={() => {setSelectedNFT(null); setPriceValue(0);}} PaperProps={{ sx: { backgroundColor: '#1E1C21', height: '15rem', width: '25rem' }}}>
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'row'}
            sx={{
                padding: 0,
                paddingRight: '10px',
                paddingLeft: '20px',
                gap: 3,
                position: 'relative',
                height: '64px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #E350FF 0%, #883099 100%)',
                },
            }}
        >
            <Typography sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500', fontSize: '16px'}} flexGrow={1}>                   
              Choose price for your NFT
            </Typography>
            <IconButton onClick={() => {setSelectedNFT(null); setPriceValue(0);}} color="primary">
                <CloseIcon sx={{color: '#ffffff'}}/>
            </IconButton>
        </Stack>
        {
            signer ? (
                <Stack sx={{paddingInline: '3rem', paddingTop: '2rem'}} gap={3}>
                  <TextField
                    type="number"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ffffff',
                            },
                            '&:hover fieldset': {
                                borderColor: '#ffffff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#E350FF',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#ffffff',
                        },
                        '& .MuiInputBase-input': {
                            color: '#ffffff',
                        },
                        '& .MuiInputBase-root': {
                            height: '50px',
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ffffff',
                        },
                    }}
                    label="Price (ETH) *"
                    onChange={handleChangePrice}
                    name="name" 
                    placeholder="Enter price"
                    value={priceValue}
                  />
                  <Button onClick={onSubmit} sx={{ '&:hover': { backgroundColor: '#883099' }, textTransform: 'none', backgroundColor: '#E350FF', borderRadius: '5px', paddingInline: '16px', height: '40px', color: '#ffffff',width: '8rem', alignSelf: 'flex-end' }}>
                      Create NFT
                  </Button>
                </Stack>
            ) : 
            (
                <Typography>Connect your wallet</Typography>
            )
        }       
      </Dialog>
      </Grid>
    );
}

export default CollectionContainer;
import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useSigner from "../signer/signer-context";
import { CreationValues } from "./NFT-creation-form";
import NFTCreationForm from "./NFT-creation-form";
import useNFTMarket from "../../hooks/nft-market";
import { useState } from "react";

interface MintNFTDialogProps {
    open: boolean;
    onClose: () => void;
  }

function MintNFTDialog(props: MintNFTDialogProps) {
    const { open, onClose} = props;
    const {signer} = useSigner();
    const { createNFT } = useNFTMarket();
    const [cid, setCid] = useState();

    const onSubmit = async (values: CreationValues) => {
        try {
          const formData = new FormData();
          formData.append("file", values.image!);
          const metadata = JSON.stringify({
            name: values.name,
          });
          formData.append("pinataMetadata", metadata);
    
          const options = JSON.stringify({
            cidVersion: 0,
          });
          formData.append("pinataOptions", options);
    
          const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNjFkODk3Zi02NDZmLTQxOWMtYjI1Ny03Njc5YmQwYmJhYTgiLCJlbWFpbCI6ImdlbW92aWN0YXRqYW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMjVhYmVkNDI1MTJkMDI5ZWIzNiIsInNjb3BlZEtleVNlY3JldCI6IjRhMmNmMGE3OWNjNzMwNDdiZDc0MzEwYzM5NjA2ODViNjZlOTE2Y2FkYWZiYzEzMGIzYjM4ODU0ODVjZDk1MTYiLCJpYXQiOjE3MTgzOTYxNjR9.xzMQzjkoX-Fsisc2hdOMFMWQa6uDZ0ZPJ8n71rPb0p4`,
              },
              body: formData,
            }
          );
          const resData = await res.json();
          setCid(resData.IpfsHash);
          console.log(resData);
          //onClose();
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <Dialog open={open} onClose={onClose} fullScreen PaperProps={{ sx: { backgroundColor: '#1E1C21' }}}>
        <Stack
            justifyContent={'center'}
            alignItems={'flex-start'}
            sx={{
                padding: 0,
                paddingLeft: '10px',
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
            <IconButton onClick={onClose} color="primary">
                <ArrowBackIcon sx={{color: '#ffffff'}}/>
            </IconButton>
        </Stack>
        {
            signer ? (
                <Stack sx={{paddingInline: '10rem', paddingTop: '2rem'}}>
                    <NFTCreationForm onSubmit={onSubmit}/>
                </Stack>
            ) : 
            (
                <Typography>Connect your wallet</Typography>
            )
        }       
        {/* {cid && (
            <img
            src={`https://lavender-manual-coral-936.mypinata.cloud/ipfs/${cid}`}
            alt="ipfs image"
            />
        )} */}
      </Dialog>
    );
}
  
export default MintNFTDialog;
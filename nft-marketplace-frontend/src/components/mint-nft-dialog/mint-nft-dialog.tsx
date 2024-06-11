import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useSigner from "../signer/signer-context";
import { CreationValues } from "./NFT-creation-form";
import NFTCreationForm from "./NFT-creation-form";

interface MintNFTDialogProps {
    open: boolean;
    onClose: () => void;
  }

function MintNFTDialog(props: MintNFTDialogProps) {
    const { open, onClose} = props;
    const {signer} = useSigner();

    const onSubmit = async (values: CreationValues) => {
        try {
            onClose();
            //await createNFT(values);
            //toast.success("You'll see your new NFT here shortly. Refresh the page.");
          } catch (e) {
            //toast.warn("Something wrong!");
            console.log(e);
          }
    }

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
                <Stack sx={{paddingInline: '9rem', paddingTop: '2rem'}}>
                    <NFTCreationForm onSubmit={onSubmit}/>
                </Stack>
            ) : 
            (
                <Typography>Connect your wallet</Typography>
            )
        }       
      </Dialog>
    );
}
  
export default MintNFTDialog;
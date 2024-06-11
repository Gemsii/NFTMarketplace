import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MintNFTDialogProps {
    open: boolean;
    onClose: () => void;
  }

function MintNFTDialog(props: MintNFTDialogProps) {
    const { open, onClose} = props;

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
        <DialogTitle>Full Screen Dialog</DialogTitle>
        <DialogContent>
          <p>This is the content of the full screen dialog.</p>
        </DialogContent>
      </Dialog>
    );
}
  
export default MintNFTDialog;
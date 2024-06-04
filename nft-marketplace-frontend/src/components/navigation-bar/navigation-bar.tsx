import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import useSigner from "../signer/signer-context";

function NavBar() {
    const {signer, address, connectWallet} = useSigner();

    const handleChangePage = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event)
        return;           
    };

    return (
        <AppBar
            position="static"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "#1E1C21",
            }}
        >
            <Toolbar
                sx={{
                    padding: 0,
                    gap: 3,
                    position: 'relative',
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
                <Typography
                    sx={{fontSize: '22px',fontFamily: 'sans-serif', fontWeight: 600,paddingInline: '8px',background: 'linear-gradient(90deg, #E350FF 0%, #883099 100%)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',}}>
                    NFTnook
                </Typography>
                <Stack flexDirection={'row'} gap={3} flexGrow={1} justifyContent={'center'}>
                        <Button
                            key={'Home'}
                            onClick={(e) => handleChangePage(e)}
                            sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#1E1C21' } }}
                        >
                            <Typography textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontSize: '14px'}}>Explore</Typography>
                        </Button>
                        <Button
                            key={'Owned'}
                            onClick={(e) => handleChangePage(e)}
                            sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#1E1C21' } }}
                        >
                            <Typography textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontSize: '14px'}}>My Collection</Typography>
                        </Button>
                </Stack>               
                <Stack>
                    <Button sx={{ '&:hover': { backgroundColor: '#883099' }, textTransform: 'none', backgroundColor: '#E350FF', borderRadius: '5px', paddingInline: '16px', height: '30px' }}>   
                        <Typography variant="body1" textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500', fontSize: '14px'}}>Create</Typography>
                    </Button>
                </Stack>
                <Stack ml={1} mr={1}>
                    {address ? 
                    (
                        <Stack>
                            <WalletIcon sx={{color: '#ffffff'}}/>
                        </Stack>
                    ) : 
                    (
                        <Button onClick={connectWallet} sx={{ '&:hover': { backgroundColor: '#883099' }, textTransform: 'none',  border: '2px solid #E350FF', borderRadius: '18px', paddingInline: '16px', height: '30px' }}>
                            <Typography variant="body1" textAlign="center" sx={{color: '#E350FF', textTransform: 'none', fontWeight: '500', fontSize: '14px'}}>Connect wallet</Typography>                    
                        </Button>
                    )}                   
                </Stack>
            </Toolbar>
        </AppBar>
  );
}

export default NavBar;

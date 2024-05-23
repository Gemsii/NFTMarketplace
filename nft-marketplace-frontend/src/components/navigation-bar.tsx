import {
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  Button,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import WalletIcon from '@mui/icons-material/Wallet';

function NavBar() {
    const handleChangePage = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event)
        return;           
    };

    return (
        <AppBar
            position="static"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "rgb(2,0,36);",
                boxShadow: "0 2px 5px -1px rgba(255, 255, 255, 0.5)",
            }}
        >
            <Toolbar sx={{ padding: 0, gap: 3 }}>
                <Typography sx={{fontSize: '1.4rem', fontFamily: 'sans-serif', paddingInline: '5px'}}><strong>NFT</strong>nook</Typography>
                <Divider orientation="vertical" sx={{background: '#ffffff', marginBlock: '16px', borderRadius: '5px', width: '2px'}} flexItem />
                <Stack flexDirection={'row'} gap={3} flexGrow={1}>
                        <Button
                            key={'Home'}
                            onClick={(e) => handleChangePage(e)}
                            sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' } }}
                        >
                            <Typography textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500'}}>Home</Typography>
                        </Button>
                        <Button
                            key={'Owned'}
                            onClick={(e) => handleChangePage(e)}
                            sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' } }}
                        >
                            <Typography textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500'}}>Owned</Typography>
                        </Button>
                </Stack>               
                <Stack>
                    <Button sx={{ border: '2px solid #ffffff', gap: 0.7, borderRadius: '8px', paddingInline: '10px', height: '38px', alignItems: 'flex-start', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }}}>   
                        <AddIcon sx={{color: '#ffffff', width: '20px'}}/>                         
                        <Typography variant="body1" textAlign="center" sx={{color: '#ffffff', textTransform: 'none', fontWeight: '600', fontSize: '1rem'}}>Create</Typography>
                    </Button>
                </Stack>
                <Stack ml={2}>
                    <IconButton sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' } }}>
                        <WalletIcon sx={{color: '#ffffff'}}/>                         
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
  );
}

export default NavBar;

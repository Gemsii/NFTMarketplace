import React from 'react';
import './App.css';
import NavBar from './components/navigation-bar/navigation-bar';
import { Stack } from '@mui/material';
import { SignerProvider } from './components/signer/signer-context';

function App() {
  return (
    <SignerProvider>
        <div className="App">
            <NavBar></NavBar>
            <Stack flexGrow={1}>
              {/* Router component */}
            </Stack>
        </div>
    </SignerProvider>
  );
}

export default App;

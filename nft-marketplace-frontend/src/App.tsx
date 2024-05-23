import React from 'react';
import './App.css';
import NavBar from './components/navigation-bar';
import { Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Stack flexGrow={1}>

      </Stack>
    </div>
  );
}

export default App;

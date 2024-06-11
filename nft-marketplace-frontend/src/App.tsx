import './App.css';
import NavBar from './components/navigation-bar/navigation-bar';
import { Stack } from '@mui/material';
import { SignerProvider } from './components/signer/signer-context';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ExploreContainer from './components/explore-container/explore-container';
import CollectionContainer from './components/collection-container/collection-container';

function App() {
  return (
    <Router>
      <SignerProvider>
          <div className="App">
              <NavBar></NavBar>
              <Stack flexGrow={1}>
                <Routes>
                  <Route path="/" element={<ExploreContainer />} />
                  <Route path="/MyCollection" element={<CollectionContainer />} />
                </Routes>
              </Stack>
          </div>
      </SignerProvider>
    </Router>
  );
}

export default App;

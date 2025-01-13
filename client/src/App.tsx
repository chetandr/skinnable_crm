import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CustomRouter from './CustomRouter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <CustomRouter />
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App; // Export the App component
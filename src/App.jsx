import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PokeGuesser from './pages/PokeGuesser';

import './styles.css';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guesser" element={<PokeGuesser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

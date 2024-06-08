import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PokeGuesser from './pages/PokeGuesser';
import Test from './pages/Test';

import './styles.css';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guesser" element={<PokeGuesser />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

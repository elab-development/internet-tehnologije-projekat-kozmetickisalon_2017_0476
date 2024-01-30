import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SpaSpecialists from './components/SpaSpecialists';
import KozmetickeUsluge from './components/KozmetickeUsluge';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/spa-specialists" element={<SpaSpecialists/>} />
          <Route path="/spa-services" element={<KozmetickeUsluge/>} />
        </Routes>
        
        <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import FindWaste from './components/FindWaste';
import Categories from './components/Categories';
import EcoTips from './components/EcoTips';
import Quiz from './components/Quiz';
import Community from './components/Community';
import About from './components/About';
import Scanner from './components/Scanner';
import Gallery from './components/Gallery';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'find-waste':
        return <FindWaste />;
      case 'categories':
        return <Categories />;
      case 'eco-tips':
        return <EcoTips />;
      case 'quiz':
        return <Quiz />;
      case 'community':
        return <Community />;
      case 'about':
        return <About />;
      case 'scanner':
        return <Scanner />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        <div key={currentPage} className="fade-in">
          {renderPage()}
        </div>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import GaleriPage from './pages/GaleriPage';
import ProfilDesaPage from './pages/ProfilDesaPage';
import InfografisPage from './pages/InfografisPage';
import ListingPage from './pages/ListingPage';
import PPIDPage from './pages/PPIDPage';
import BelanjaPage from './pages/BelanjaPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil-desa" element={<ProfilDesaPage />} />
            <Route path="/infografis" element={<InfografisPage />} />
            <Route path="/ppid" element={<PPIDPage />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/belanja" element={<BelanjaPage />} />
            <Route path="/galeri" element={<GaleriPage />} />
            <Route path="/login" element={<div className="container mx-auto px-4 py-20 text-center"><h2 className="text-2xl font-bold">Halaman Login</h2><p className="mt-4">Fitur login akan tersedia segera.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

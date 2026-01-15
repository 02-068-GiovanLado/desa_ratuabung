import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeritaPage from './pages/BeritaPage';
import DetailBeritaPage from './pages/DetailBeritaPage';
import ProfilDesaPage from './pages/ProfilDesaPage';
import InfografisPage from './pages/InfografisPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil-desa" element={<ProfilDesaPage />} />
            <Route path="/infografis" element={<InfografisPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:slug" element={<DetailBeritaPage />} />
            <Route path="/login" element={<div className="container mx-auto px-4 py-20 text-center"><h2 className="text-2xl font-bold">Halaman Login</h2><p className="mt-4">Fitur login akan tersedia segera.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

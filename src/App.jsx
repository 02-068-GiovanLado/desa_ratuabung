import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import DashboardAdmin from './pages/DashboardAdmin';
import { AuthProvider, useAuth } from './admin/context/AuthContext';

// Create the files in these locations:
// src/admin/context/AuthContext.jsx
// src/admin/pages/LoginPage.jsx
// src/pages/DashboardAdmin.jsx

// Placeholder component - replace with actual LoginPage
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        <p>Please create src/admin/pages/LoginPage.jsx</p>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <HomePage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/profil-desa" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <ProfilDesaPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/infografis" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <InfografisPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/ppid" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <PPIDPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/listing" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <ListingPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/belanja" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <BelanjaPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/galeri" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                <GaleriPage />
              </main>
              <Footer />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">404 - Halaman Tidak Ditemukan</h2>
                  <a href="/" className="text-[#2E5C8A] hover:underline">Kembali ke Beranda</a>
                </div>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
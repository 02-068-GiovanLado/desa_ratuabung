import { useState, useEffect } from 'react';
import { galeriAPI } from '../services/api';

const GaleriPage = () => {
  const [galeriData, setGaleriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        setLoading(true);
        const response = await galeriAPI.getAll();
        // Handle response structure: { success: true, data: [...] }
        const dataArray = response.data || response || [];
        setGaleriData(dataArray);
      } catch (error) {
        console.error('Error fetching galeri:', error);
        // Use fallback data if API fails
        setGaleriData([
          { id: 1, judul: 'Kegiatan Gotong Royong Warga Desa Ratu Abung', tanggal: '2026-01-10', views: 150, author: 'Admin Desa', gambar: '/images/galeri-1.jpg' },
          { id: 2, judul: 'Penyuluhan Pertanian Modern', tanggal: '2026-01-08', views: 230, author: 'Admin Desa', gambar: '/images/galeri-2.jpg' },
          { id: 3, judul: 'Posyandu Mengadakan Pemeriksaan Rutin', tanggal: '2026-01-05', views: 189, author: 'Posyandu Desa', gambar: '/images/galeri-3.jpg' },
          { id: 4, judul: 'Pelatihan UMKM untuk Warga Desa', tanggal: '2026-01-03', views: 165, author: 'Kelompok Tani', gambar: '/images/galeri-4.jpg' },
          { id: 5, judul: 'Festival Budaya Desa Ratu Abung', tanggal: '2025-12-31', views: 342, author: 'Bidan Desa', gambar: '/images/galeri-5.jpg' },
          { id: 6, judul: 'Pembangunan Infrastruktur Jalan Desa', tanggal: '2025-12-28', views: 278, author: 'Admin Desa', gambar: '/images/galeri-6.jpg' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleri();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(galeriData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = galeriData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-[#1E3A5F]">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E3A5F] font-medium">Galeri</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">Galeri Desa Ratu Abung</h1>
          <p className="text-gray-600 text-base md:text-lg">Dokumentasi kegiatan dan momen-momen penting di Desa Ratu Abung</p>
        </div>
      </div>

      {/* Gallery Grid Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A5F]"></div>
              <p className="mt-4 text-gray-600">Memuat galeri...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {/* Gambar */}
                  <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image || item.gambar}
                      alt={item.title || item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/galeri-dummy.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    {/* Badge Tanggal */}
                    <div className="absolute top-4 right-4 bg-[#1E3A5F] text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                      {new Date(item.createdAt || item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Konten */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors min-h-14">
                      {item.title || item.judul || item.nama || 'Kegiatan Desa'}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{item.views} kali dilihat</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg transition-all font-medium ${
                      currentPage === pageNumber
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GaleriPage;

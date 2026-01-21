import { useState, useEffect } from 'react';
import { galeriAPI } from '../services/api';

const GaleriPage = () => {
  const [galeriData, setGaleriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await galeriAPI.getAll();
        // Handle response structure: { success: true, data: [...] }
        const dataArray = response.data || response || [];
        setGaleriData(dataArray);
      } catch (error) {
        console.error('Error fetching galeri:', error);
        setError('Gagal memuat galeri. Pastikan backend sudah berjalan.');
        setGaleriData([]); // Set empty array on error
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
    <div className="bg-gray-50">
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

      {/* Loading State */}
      {loading && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A5F]"></div>
              <p className="mt-4 text-gray-600">Memuat galeri...</p>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Gagal Memuat Galeri</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid Section */}
      {!loading && !error && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {currentData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada galeri foto</p>
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
            {!loading && !error && totalPages > 1 && (
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
      )}
    </div>
  );
};

export default GaleriPage;

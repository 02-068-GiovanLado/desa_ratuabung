import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BeritaPage = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    // Mock data berita
    const mockBerita = [
      {
        id: 1,
        slug: 'kegiatan-gotong-royong',
        title: 'Kegiatan Gotong Royong Membersihkan Lingkungan Desa',
        description: 'Warga desa Ratu Abung mengadakan kegiatan gotong royong rutin untuk membersihkan lingkungan desa dan fasilitas umum.',
        author: 'Admin Desa',
        date: '2026-01-10',
        views: 150,
        image: '/images/berita-1.jpg'
      },
      {
        id: 2,
        slug: 'penyuluhan-pertanian',
        title: 'Penyuluhan Pertanian Modern untuk Petani Desa',
        description: 'Dinas Pertanian mengadakan penyuluhan tentang teknik pertanian modern dan penggunaan pupuk organik yang ramah lingkungan.',
        author: 'Admin Desa',
        date: '2026-01-08',
        views: 230,
        image: '/images/berita-2.jpg'
      },
      {
        id: 3,
        slug: 'vaksinasi-balita',
        title: 'Posyandu Mengadakan Vaksinasi Balita',
        description: 'Posyandu desa mengadakan kegiatan vaksinasi balita gratis untuk meningkatkan kesehatan anak-anak di desa.',
        author: 'Admin Desa',
        date: '2026-01-05',
        views: 189,
        image: '/images/berita-3.jpg'
      },
      {
        id: 4,
        slug: 'pembangunan-jalan',
        title: 'Pembangunan Jalan Desa Tahap 2 Dimulai',
        description: 'Pemerintah desa memulai tahap kedua pembangunan jalan desa untuk meningkatkan akses dan mobilitas warga.',
        author: 'Admin Desa',
        date: '2026-01-03',
        views: 312,
        image: '/images/berita-4.jpg'
      },
      {
        id: 5,
        slug: 'pelatihan-umkm',
        title: 'Pelatihan UMKM untuk Meningkatkan Ekonomi Desa',
        description: 'Diadakan pelatihan UMKM bagi para pelaku usaha kecil menengah di desa untuk meningkatkan keterampilan dan daya saing.',
        author: 'Admin Desa',
        date: '2026-01-01',
        views: 267,
        image: '/images/berita-5.jpg'
      },
      {
        id: 6,
        slug: 'festival-budaya',
        title: 'Festival Budaya Desa Meriahkan Tahun Baru',
        description: 'Masyarakat desa merayakan tahun baru dengan festival budaya yang menampilkan berbagai kesenian dan kuliner lokal.',
        author: 'Admin Desa',
        date: '2025-12-31',
        views: 425,
        image: '/images/berita-6.jpg'
      }
    ];

    setBerita(mockBerita);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 font-poppins" id="berita-container">
      <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2 sm:mb-3">Berita Desa</h2>
      <p className="text-base sm:text-lg text-black mb-6 sm:mb-8">
        Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan artikel-artikel jurnalistik dari Desa Bandarejo
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8">
        {berita.length > 0 ? (
          berita.map((item) => {
            const { day, month, year } = formatDate(item.date);
            
            return (
              <Link 
                key={item.id}
                to={`/berita/${item.slug}`}
                className="relative bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-slate-100 transition-transform duration-300 ease-out will-change-transform hover:shadow-lg md:hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {/* Gambar adaptif */}
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-60 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-40 sm:h-48 md:h-56 lg:h-60 bg-gray-200 flex items-center justify-center" style={{ display: item.image ? 'none' : 'flex' }}>
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                </div>

                {/* Konten */}
                <div className="p-4 sm:p-5 pr-0 md:pr-28 lg:pr-36 flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-slate-600 text-sm sm:text-base line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 sm:mt-5 space-y-1 flex-grow">
                    <div className="flex items-center gap-2 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1 7 7 0 0 1 14 0Z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">Dilihat {item.views.toLocaleString('id-ID')} kali</span>
                    </div>
                  </div>
                </div>

                {/* Badge tanggal */}
                <div className="absolute bottom-0 right-0 z-10 bg-gradient-to-br from-emerald-600 to-emerald-300 text-white rounded-tl-xl rounded-br-xl px-3 sm:px-4 py-2 leading-tight text-center shadow-md ring-1 ring-emerald-500/20">
                  <div className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{day} {month}</div>
                  <div className="text-xs font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>{year}</div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-newspaper text-gray-300 text-6xl mb-4"></i>
            <p className="text-gray-600 text-lg">Belum ada berita yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeritaPage;

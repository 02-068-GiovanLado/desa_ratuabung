const GaleriPage = () => {
  const galeriData = [
    { id: 1, judul: 'Kegiatan Gotong Royong Warga Desa Bandarejo', tanggal: '10 Jan 2026', views: 150, author: 'Admin Desa', gambar: '/images/galeri-1.jpg' },
    { id: 2, judul: 'Penyuluhan Pertanian Modern', tanggal: '8 Jan 2026', views: 230, author: 'Admin Desa', gambar: '/images/galeri-2.jpg' },
    { id: 3, judul: 'Posyandu Mengadakan Pemeriksaan Rutin', tanggal: '5 Jan 2026', views: 189, author: 'Posyandu desa', gambar: '/images/galeri-3.jpg' },
    { id: 4, judul: 'Pelatihan UMKM Desa', tanggal: '3 Jan 2026', views: 165, author: 'Admin Desa', gambar: '/images/galeri-4.jpg' },
    { id: 5, judul: 'Festival Budaya Desa', tanggal: '31 Des 2025', views: 342, author: 'Admin Desa', gambar: '/images/galeri-5.jpg' },
    { id: 6, judul: 'Pembangunan Jalan Desa', tanggal: '28 Des 2025', views: 278, author: 'Admin Desa', gambar: '/images/galeri-6.jpg' },
    { id: 7, judul: 'Perayaan HUT RI ke-81', tanggal: '17 Agu 2025', views: 456, author: 'Admin Desa', gambar: '/images/galeri-7.jpg' },
    { id: 8, judul: 'Kunjungan Dinas Pertanian', tanggal: '15 Des 2025', views: 198, author: 'Admin Desa', gambar: '/images/galeri-8.jpg' },
    { id: 9, judul: 'Sosialisasi Program Desa', tanggal: '12 Des 2025', views: 223, author: 'Admin Desa', gambar: '/images/galeri-9.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 font-poppins">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961] mb-2 sm:mb-3">
          Galeri Desa
        </h2>
        <p className="text-base sm:text-lg text-black mb-6 sm:mb-8">
          Menyajikan dokumentasi kegiatan dan momen-momen penting di Desa Bandarejo
        </p>

        {/* Grid Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8">
          {galeriData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Gambar */}
              <div className="w-full h-40 sm:h-48 md:h-56 lg:h-60 bg-gray-200 overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/galeri-dummy.jpg';
                    e.target.onerror = null;
                  }}
                />
              </div>

              {/* Konten */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 hover:text-[#2C7961] transition-colors duration-200 line-clamp-2">
                  {item.judul}
                </h3>

                <div className="mt-4 sm:mt-5 space-y-1">
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
                    <span className="text-xs sm:text-sm">Dilihat {item.views} kali</span>
                  </div>
                </div>
              </div>

              {/* Badge Tanggal */}
              <div className="absolute bottom-0 right-0 z-10 bg-gradient-to-br from-[#2C7961] to-emerald-300 text-white rounded-tl-xl rounded-br-xl px-3 sm:px-4 py-2 leading-tight text-center shadow-md ring-1 ring-emerald-500/20">
                <div className="text-xs font-semibold">{item.tanggal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GaleriPage;

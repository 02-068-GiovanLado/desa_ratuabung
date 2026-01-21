const GaleriPage = () => {
  const galeriData = [
    { id: 1, judul: 'Kegiatan Gotong Royong Warga Desa Ratu Abung', tanggal: '10 Jan 2026', views: 150, author: 'Admin Desa', gambar: '/images/galeri-1.jpg' },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriData.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Gambar */}
                <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/images/galeri-dummy.jpg';
                      e.target.onerror = null;
                    }}
                  />
                  {/* Badge Tanggal */}
                  <div className="absolute top-4 right-4 bg-[#1E3A5F] text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                    {item.tanggal}
                  </div>
                </div>

                {/* Konten */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#1E3A5F] line-clamp-2 mb-3 group-hover:text-[#2E5C8A] transition-colors">
                    {item.judul}
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
        </div>
      </section>
    </div>
  );
};

export default GaleriPage;

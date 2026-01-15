import { Link } from 'react-router-dom';

const HomePage = () => {
  const pejabat = [
    { nama: 'Sularto', jabatan: 'Kepala Desa', foto: '/images/kades.jpg' },
    { nama: 'Sutrisno', jabatan: 'Sekretaris Desa', foto: '/images/sekdes.jpg' },
    { nama: 'Sri Rahayu', jabatan: 'Bendahara Desa', foto: '/images/pejabat-3.jpg' },
    { nama: 'Supriyadi', jabatan: 'Kepala Urusan Perencanaan', foto: '/images/kaur-perencanaan.jpg' },
    { nama: 'Budi Santoso', jabatan: 'Kepala Urusan TU dan Umum', foto: '/images/kaur-tu.jpg' },
    { nama: 'Suparto', jabatan: 'Kasi Kesra', foto: '/images/kasikesra.jpg' },
    { nama: 'Suseno', jabatan: 'Kasi Pelayanan', foto: '/images/kasipelayanan.jpg' },
    { nama: 'Jarman', jabatan: 'Kepala Dusun 1', foto: '/images/kadus1.jpg' },
    { nama: 'Tomad', jabatan: 'Kepala Dusun 2', foto: '/images/kadus2.jpg' },
    { nama: 'Marsudi', jabatan: 'Kepala Dusun 4', foto: '/images/kadus4.jpg' },
    { nama: 'Suraji', jabatan: 'Kepala Dusun 6', foto: '/images/kadus6.jpg' },
  ];

  return (
    <div>
      {/* ================= HERO ================= */}
      <div 
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/container.png')" }}
      >
        {/* Overlay (opsional) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Konten teks */}
        <div className="relative z-10 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Selamat Datang di Website Resmi Desa Bandarejo
          </h1>
          <p className="text-white leading-relaxed max-w-2xl mx-auto">
            Website Resmi Pemerintah Desa Bandarejo, Kecamatan Natar, Kabupaten Lampung Selatan.
            Dapatkan informasi terbaru seputar desa, layanan publik, dan kegiatan masyarakat.
          </p>
        </div>
      </div>

      {/* ================= JELAJAHI DESA ================= */}
      <section className="bg-white">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2C7961] leading-tight">
                  JELAJAHI DESA
                </h2>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan desa.
                  Aspek pemerintahan, penduduk, demografi, potensi desa, dan juga berita tentang desa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link 
                  to="/profil-desa"
                  className="group relative w-full h-[227px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundImage: "url('/images/Component11.png')" }}
                  ></div>
                  <div className="relative flex flex-col items-center justify-center h-full p-6">
                    <div className="mb-6">
                      <img 
                        src="/images/Component11.png" 
                        alt="Profil Desa"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#2C7961] tracking-wider uppercase">
                      PROFIL DESA
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#2C7961] rounded-2xl transition-colors"></div>
                </Link>

                <Link 
                  to="/infografis"
                  className="group relative w-full h-[227px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundImage: "url('/images/Other.png')" }}
                  ></div>
                  <div className="relative flex flex-col items-center justify-center h-full p-6">
                    <div className="mb-6">
                      <img 
                        src="/images/Other.png" 
                        alt="Infografis"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#2C7961] tracking-wider uppercase">
                      INFOGRAFIS
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#2C7961] rounded-2xl transition-colors"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BERITA ================= */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link 
            to="/berita"
            className="inline-block bg-[#2C7961] hover:bg-[#256952] text-white font-medium px-6 py-3 rounded-md transition"
          >
            Lihat Berita Terbaru
          </Link>
        </div>
      </section>

      {/* ================= SAMBUTAN KEPALA DESA ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="/images/kades.jpg"
                alt="Kepala Desa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Teks sambutan */}
          <div className="md:col-span-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#2C7961]">
              Sambutan Kepala Desa Bandarejo
            </h3>
            <div className="mt-1">
              <p className="text-xs font-extrabold tracking-wide text-black">SULARTO</p>
              <p className="text-[11px] uppercase tracking-wide text-black/60">KEPALA DESA BANDAREJO</p>
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-black/80 text-justify">
              Selamat datang di Website Resmi Pemerintah Desa Bandarejo, Kecamatan Natar, Kabupaten Lampung Selatan.
              Website ini hadir sebagai sarana informasi yang bertujuan untuk memberikan pelayanan yang lebih baik dan
              lebih cepat kepada seluruh masyarakat Desa Bandarejo. Dengan kemajuan teknologi yang semakin pesat, kami berharap
              platform ini dapat menjadi jembatan yang menghubungkan antara pemerintah desa dengan warga.
              Melalui website ini, masyarakat dapat dengan mudah mengakses berbagai informasi penting terkait program,
              kegiatan, dan kebijakan yang dilaksanakan oleh Pemerintah Desa Bandar Rejo.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SOTK ===== */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961]">SOTK</h2>
          <p className="text-sm md:text-base text-black/80 mt-1">
            Struktur Organisasi dan Tata Kerja Desa Bandarejo
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pejabat.map((p, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-56 bg-gradient-to-b from-gray-200 to-gray-100 flex items-end justify-center">
                  <img
                    src={p.foto}
                    alt={p.nama}
                    className="w-100 h-48 object-contain drop-shadow"
                    onError={(e) => { e.target.src = '/images/kades-dummy.jpg'; }}
                  />
                </div>

                <div className="bg-[#2C7961] px-4 py-3 text-white">
                  <div className="text-white text-[13px] font-extrabold tracking-wide uppercase leading-tight">
                    {p.nama}
                  </div>
                  <div className="text-white/90 text-[11px] leading-tight">
                    {p.jabatan}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POTENSI DESA ================= */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 font-poppins">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961]">POTENSI DESA</h2>
              <p className="mt-1 text-sm md:text-base text-black/80 max-w-lg">
                Informasi tentang potensi dan kemajuan desa di berbagai bidang seperti ekonomi, pariwisata,
                pertanian, industri kreatif, dan kelestarian lingkungan.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { judul: 'Pertanian Padi', deskripsi: 'Desa Bandarejo memiliki lahan pertanian yang luas dengan hasil panen padi yang melimpah setiap musimnya.', gambar: '/images/tani.png' },
              { judul: 'Peternakan', deskripsi: 'Pengembangan peternakan sapi dan kambing sebagai sumber pendapatan alternatif masyarakat desa.', gambar: '/images/tani.png' },
              { judul: 'UMKM Lokal', deskripsi: 'Berbagai usaha mikro kecil menengah berkembang di desa, mulai dari kerajinan tangan hingga makanan olahan.', gambar: '/images/tani.png' },
            ].map((potensi, index) => (
              <article key={index} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col">
                <div className="h-40 md:h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={potensi.gambar}
                    alt={potensi.judul}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm md:text-base font-extrabold text-[#2C7961] mb-2">
                    {potensi.judul}
                  </h3>
                  <p className="text-xs md:text-sm text-black/70 flex-1">
                    {potensi.deskripsi}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALERI DESA ================= */}
      <section className="bg-white py-10 font-poppins">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961]">GALERI DESA</h2>
            <p className="text-sm md:text-base text-black/80 mt-1">
              Menampilkan kegiatan-kegiatan yang berlangsung di desa
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { judul: 'Gotong Royong Membersihkan Desa', tanggal: '15 Januari 2026', gambar: '/images/galeri-1.jpg' },
              { judul: 'Perayaan HUT RI ke-81', tanggal: '17 Agustus 2025', gambar: '/images/galeri-2.jpg' },
              { judul: 'Pelatihan Pertanian Modern', tanggal: '10 Januari 2026', gambar: '/images/galeri-3.jpg' },
              { judul: 'Posyandu Balita', tanggal: '5 Januari 2026', gambar: '/images/galeri-4.jpg' },
              { judul: 'Festival Budaya Desa', tanggal: '31 Desember 2025', gambar: '/images/galeri-5.jpg' },
              { judul: 'Pembangunan Jalan Desa', tanggal: '20 Desember 2025', gambar: '/images/galeri-6.jpg' },
            ].map((foto, index) => (
              <div key={index} className="rounded-md bg-white shadow-sm overflow-hidden border border-gray-200">
                <img
                  src={foto.gambar}
                  alt={foto.judul}
                  className="w-full h-40 md:h-48 object-cover"
                  onError={(e) => { 
                    e.target.src = '/images/galeri-dummy.jpg';
                    e.target.onerror = null;
                  }}
                />
                <div className="px-3 py-2 text-[11px] md:text-xs text-black/70">
                  <p className="font-semibold line-clamp-1">{foto.judul}</p>
                  <p className="text-[10px] text-gray-400">{foto.tanggal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEEDBACK PENGUNJUNG ================= */}
      <section className="bg-white py-10 font-poppins">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961] mb-2 text-center">Kritik & Saran</h2>
          <p className="text-sm md:text-base text-black/80 mb-6 text-center">
            Kami sangat menghargai masukan Anda untuk meningkatkan pelayanan dan kualitas website Desa Bandar Rejo.
            Silakan tinggalkan kritik, saran, atau pesan Anda di bawah ini.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Terima kasih atas feedback Anda! Fitur ini akan segera terhubung dengan backend.');
            }}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div>
              <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7961]"
                placeholder="Nama Anda (opsional)"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7961]"
                placeholder="Email Anda (opsional)"
              />
            </div>

            <div>
              <label htmlFor="pesan" className="block text-sm font-semibold text-gray-700 mb-1">
                Pesan / Saran <span className="text-red-600">*</span>
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows="4"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7961]"
                placeholder="Tulis kritik, saran, atau pesan Anda di sini..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#2C7961] hover:bg-[#256952] text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Kirim Feedback
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Data Anda akan dijaga kerahasiaannya. Terima kasih atas partisipasi Anda!
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

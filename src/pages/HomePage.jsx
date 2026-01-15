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
            <div className="space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C7961] leading-tight">
                JELAJAHI DESA
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan desa.
                Aspek pemerintahan, penduduk, demografi, potensi desa, dan juga berita tentang desa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

              <div className="group relative w-full h-[227px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="relative flex flex-col items-center justify-center h-full p-6">
                  <div className="mb-6">
                    <svg className="w-16 h-16 text-[#2C7961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#2C7961] tracking-wider uppercase">
                    IDM
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#2C7961] rounded-2xl transition-colors"></div>
              </div>

              <div className="group relative w-full h-[227px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="relative flex flex-col items-center justify-center h-full p-6">
                  <div className="mb-6">
                    <svg className="w-16 h-16 text-[#2C7961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#2C7961] tracking-wider uppercase">
                    PPID
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#2C7961] rounded-2xl transition-colors"></div>
              </div>
            </div>
          </div>
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

      {/* ================= PETA DESA ================= */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961] mb-2">PETA DESA</h2>
          <p className="text-sm md:text-base text-black/80 mb-6">
            Menampilkan Peta Desa Dengan <span className="italic">Interest Point</span> Desa Bandarejo
          </p>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="relative w-full h-[500px] md:h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31730.5!2d105.3!3d-5.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjQnMDAuMCJTIDEwNcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Bandarejo"
              ></iframe>
            </div>
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

          <div className="mt-5 overflow-x-auto pb-4">
            <div className="flex gap-5 min-w-max">
              {pejabat.map((p, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-64 flex-shrink-0">
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
        </div>
      </section>

      {/* ================= POTENSI DESA ================= */}
      {/* ================= ADMINISTRASI PENDUDUK ================= */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 font-poppins">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C7961]">Administrasi Penduduk</h2>
              <p className="mt-1 text-sm md:text-base text-black/80 max-w-3xl">
                Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan 
                dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              { label: 'Penduduk', value: 0 },
              { label: 'Laki-Laki', value: 0 },
              { label: 'Kepala Keluarga', value: 0 },
              { label: 'Perempuan', value: 0 },
              { label: 'Penduduk Sementara', value: 0 },
              { label: 'Mutasi Penduduk', value: 0 },
            ].map((item, index) => (
              <div key={index} className="flex items-stretch gap-0 rounded-lg overflow-hidden shadow border border-gray-200">
                <div className="bg-[#2C7961] flex items-center justify-center px-8 py-6 min-w-[140px]">
                  <span className="text-6xl font-bold text-white">{item.value}</span>
                </div>
                <div className="bg-gray-50 flex items-center justify-center flex-1 px-6 py-6">
                  <span className="text-lg md:text-xl font-semibold text-gray-700">{item.label}</span>
                </div>
              </div>
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { judul: 'Gotong Royong Membersihkan Desa', tanggal: '15 Januari 2026', gambar: '/images/galeri-1.jpg' },
              { judul: 'Perayaan HUT RI ke-81', tanggal: '17 Agustus 2025', gambar: '/images/galeri-2.jpg' },
              { judul: 'Pelatihan Pertanian Modern', tanggal: '10 Januari 2026', gambar: '/images/galeri-3.jpg' },
            ].map((foto, index) => (
              <div key={index} className="rounded-md bg-white shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
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

          <div className="mt-6 text-center">
            <Link 
              to="/galeri"
              className="inline-block bg-[#2C7961] hover:bg-[#256952] text-white font-medium px-6 py-2.5 rounded-md transition"
            >
              Lihat Foto Lebih Banyak
            </Link>
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

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({
    penduduk: 0,
    lakiLaki: 0,
    kepalaKeluarga: 0,
    perempuan: 0
  });

  const pejabat = [
    { nama: 'Budiyono', jabatan: 'Kepala Desa', foto: '/images/kades.jpg' },
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

  // Animated counter effect
  useEffect(() => {
    const targetValues = {
      penduduk: 3154,
      lakiLaki: 1565,
      kepalaKeluarga: 904,
      perempuan: 1589
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targetValues).forEach(key => {
          const target = targetValues[key];
          const current = prev[key];
          const increment = Math.ceil(target / steps);
          
          if (current < target) {
            newCounters[key] = Math.min(current + increment, target);
            allComplete = false;
          } else {
            newCounters[key] = target;
          }
        });

        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Auto carousel for SOTK
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, pejabat.length - 3));
    }, 4000);
    return () => clearInterval(timer);
  }, [pejabat.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, pejabat.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, pejabat.length - 3)) % Math.max(1, pejabat.length - 3));
  };

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* ================= HERO - Gov.sg Inspired ================= */}
      <div 
        className="relative w-full min-h-[600px] md:min-h-[700px] bg-cover bg-center flex items-center animate-fade-in"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        {/* Cleaner Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/85 to-[#1E3A5F]/70"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl animate-slide-up">
            {/* Breadcrumb Style Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white/90 text-sm font-medium">Pemerintah Desa</span>
              <span className="text-white/60">•</span>
              <span className="text-white text-sm font-semibold">Ratu Abung</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Selamat Datang di <br className="hidden md:block" />
              <span className="text-white">Desa Ratu Abung</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Website Resmi Pemerintah Desa Ratu Abung, Kecamatan Abung Selatan, Kabupaten Lampung Utara.
              Informasi pelayanan publik, data desa, dan kegiatan masyarakat.
            </p>
            
            {/* CTA Buttons - Gov.sg Style */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/profil-desa"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1E3A5F] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                <span>Profil Desa</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/infografis"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <span>Infografis</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LAYANAN & INFORMASI - Gov.sg Inspired ================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Layanan & Informasi
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl">
              Akses informasi pemerintahan desa, data demografi, layanan publik, dan kegiatan masyarakat.
            </p>
          </div>

          {/* Cards Grid - Clean Gov.sg Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/profil-desa"
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  Profil Desa
                </h3>
                <p className="text-sm text-gray-600 mb-3">Informasi lengkap profil dan sejarah desa</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/infografis"
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  Infografis
                </h3>
                <p className="text-sm text-gray-600 mb-3">Data visual dan statistik desa</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/infografis#idm" 
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  IDM
                </h3>
                <p className="text-sm text-gray-600 mb-3">Indeks Desa Membangun</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/infografis#ppid" 
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  PPID
                </h3>
                <p className="text-sm text-gray-600 mb-3">Pejabat Pengelola Informasi Publik</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SAMBUTAN KEPALA DESA - Gov.sg Inspired ================= */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid gap-8 md:grid-cols-5 items-center">
              {/* Image Column */}
              <div className="md:col-span-2 p-8 md:p-12">
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="absolute inset-0 bg-[#EFF6FF] rounded-2xl transform rotate-3"></div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="/images/kades.jpg"
                      alt="Kepala Desa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="md:col-span-3 p-8 md:pr-12">
                <div className="inline-block bg-[#EFF6FF] text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Sambutan
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
                  Kepala Desa Ratu Abung
                </h3>
                <p className="text-lg font-semibold text-[#2E5C8A] mb-6">
                  Budiyono
                </p>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Selamat datang di Website Resmi Pemerintah Desa Ratu Abung. Website ini hadir sebagai sarana informasi yang bertujuan untuk memberikan pelayanan yang lebih baik dan lebih cepat kepada seluruh masyarakat.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Dengan kemajuan teknologi yang semakin pesat, kami berharap platform ini dapat menjadi jembatan yang menghubungkan antara pemerintah desa dengan warga.
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">Salam hangat untuk kemajuan Desa Ratu Abung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PETA DESA ================= */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A5F] mb-2">PETA DESA</h2>
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

      {/* ===== SOTK dengan Carousel ===== */}
      <section className="bg-gradient-to-br from-[#EFF6FF] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F]">Struktur Organisasi</h2>
            <p className="text-sm md:text-base text-gray-600">
              Pejabat dan Perangkat Desa Ratu Abung
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 4)}%)` }}
              >
                {pejabat.map((p, index) => (
                  <div key={index} className="w-1/4 flex-shrink-0 px-3">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                      <div className="h-64 bg-gradient-to-b from-gray-100 to-white flex items-end justify-center p-4">
                        <img
                          src={p.foto}
                          alt={p.nama}
                          className="w-full h-56 object-contain drop-shadow-lg"
                          onError={(e) => { e.target.src = '/images/kades-dummy.jpg'; }}
                        />
                      </div>
                      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2E5C8A] px-4 py-4 text-white">
                        <div className="text-white text-sm font-bold tracking-wide leading-tight">
                          {p.nama}
                        </div>
                        <div className="text-white/90 text-xs mt-1 leading-tight">
                          {p.jabatan}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#EFF6FF] text-[#1E3A5F] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#EFF6FF] text-[#1E3A5F] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.max(1, pejabat.length - 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'bg-[#3B82F6] w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADMINISTRASI PENDUDUK dengan Animated Counter ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F]">Statistik Penduduk</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Data real-time kependudukan Desa Ratu Abung untuk pelayanan publik yang efektif dan efisien
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Penduduk', value: counters.penduduk, icon: '👥', color: 'from-[#3B82F6] to-[#2563EB]' },
              { label: 'Laki-Laki', value: counters.lakiLaki, icon: '👨', color: 'from-[#2E5C8A] to-[#1E3A5F]' },
              { label: 'Perempuan', value: counters.perempuan, icon: '👩', color: 'from-pink-500 to-pink-600' },
              { label: 'Kepala Keluarga', value: counters.kepalaKeluarga, icon: '🏠', color: 'from-amber-500 to-amber-600' },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{item.icon}</span>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gray-800 mb-1">
                        {item.value.toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm font-medium text-gray-600">{item.label}</div>
                    </div>
                  </div>
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {[
              { label: 'Penduduk Sementara', value: 0 },
              { label: 'Mutasi Penduduk', value: 0 },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
                <div className="flex items-center">
                  <div className="bg-[#1E3A5F] flex items-center justify-center px-8 py-6 min-w-[140px]">
                    <span className="text-4xl font-bold text-white">{item.value}</span>
                  </div>
                  <div className="flex-1 px-6">
                    <span className="text-lg font-semibold text-gray-700">{item.label}</span>
                  </div>
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A5F]">GALERI DESA</h2>
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
              className="inline-block bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white font-medium px-6 py-2.5 rounded-md transition"
            >
              Lihat Foto Lebih Banyak
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEEDBACK PENGUNJUNG ================= */}
      <section className="bg-white py-10 font-poppins">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A5F] mb-2 text-center">Kritik & Saran</h2>
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                placeholder="Nama Anda (opsional)"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                placeholder="Tulis kritik, saran, atau pesan Anda di sini..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white font-semibold px-6 py-2 rounded-md transition"
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

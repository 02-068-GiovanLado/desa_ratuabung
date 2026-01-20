import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const InfografisPage = () => {
  const location = useLocation();
  const chartInstances = useRef({});
  const [activeTab, setActiveTab] = useState('Penduduk');

  // Mock data
  const mockData = {
    totalPenduduk: 2175,
    kepalaKeluarga: 744,
    perempuan: 1107,
    lakiLaki: 1068,
  };

  const tabs = [
    { name: 'Penduduk' },
    { name: 'APBDes' },
    { name: 'Stunting' },
    { name: 'Bansos' },
    { name: 'IDM' },
    { name: 'SDGs' },
  ];

  // Handle hash navigation from home page
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'idm') {
      setActiveTab('IDM');
    } else if (hash === 'ppid') {
      setActiveTab('IDM'); // PPID doesn't exist yet, redirect to IDM
    } else if (hash === 'sdgs') {
      setActiveTab('SDGs');
    }
  }, [location]);

  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });

    // Charts
    const destroyChart = (chartId) => {
      if (chartInstances.current[chartId]) {
        chartInstances.current[chartId].destroy();
        delete chartInstances.current[chartId];
      }
    };

    // Age Group Chart
    const ageCtx = document.getElementById('ageGroupChart');
    if (ageCtx) {
      destroyChart('ageGroupChart');
      const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'],
          datasets: [
            {
              label: 'Laki-laki',
              data: [145, 178, 189, 165, 156, 143, 134, 121, 98, 87, 76, 65, 54, 154],
              backgroundColor: 'rgba(44, 121, 97, 0.8)',
            },
            {
              label: 'Perempuan',
              data: [139, 171, 182, 158, 149, 137, 128, 115, 92, 81, 71, 61, 50, 155],
              backgroundColor: 'rgba(251, 146, 60, 0.8)',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
      chartInstances.current.ageGroupChart = ageChart;
    }

    // Dusun Chart
    const dusunCtx = document.getElementById('dusunChart');
    if (dusunCtx) {
      destroyChart('dusunChart');
      const dusunChart = new Chart(dusunCtx, {
        type: 'doughnut',
        data: {
          labels: ['Dusun 1', 'Dusun 2', 'Dusun 3', 'Dusun 4', 'Dusun 5', 'Dusun 6', 'Dusun 7'],
          datasets: [{
            data: [512, 489, 467, 423, 401, 389, 473],
            backgroundColor: [
              'rgba(44, 121, 97, 0.8)',
              'rgba(251, 146, 60, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(234, 179, 8, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
      chartInstances.current.dusunChart = dusunChart;
    }

    // Education Chart
    const eduCtx = document.getElementById('educationChart');
    if (eduCtx) {
      destroyChart('educationChart');
      const eduChart = new Chart(eduCtx, {
        type: 'bar',
        data: {
          labels: ['Tidak/Belum Sekolah', 'Belum Tamat SD', 'Tamat SD', 'SLTP', 'SLTA', 'Diploma I/II', 'Akademi/Diploma III', 'Diploma IV/Strata I', 'Strata II', 'Strata III'],
          datasets: [{
            label: 'Jumlah Penduduk',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(44, 121, 97, 0.8)',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true }
          }
        }
      });
      chartInstances.current.educationChart = eduChart;
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) {
          chart.destroy();
        }
      });
      chartInstances.current = {};
    };
  }, []);

  const topPekerjaan = [
    { nama: 'Petani', total: 109 },
    { nama: 'Buruh Tani', total: 209 },
    { nama: 'Buruh Perusahaan', total: 48 },
    { nama: 'Tidak bekerja/Pengangguran', total: 67 },
    { nama: 'Pedagang/Jasa', total: 25 },
    { nama: 'Karyawan/Pegawai Swasta', total: 37 },
  ];

  const allPekerjaan = [
    { jenis: 'TNI/POLRI', jumlah: 8 },
    { jenis: 'PNS/PPPK', jumlah: 12 },
    { jenis: 'Karyawan/Pegawai Swasta', jumlah: 37 },
    { jenis: 'Petani', jumlah: 109 },
    { jenis: 'Buruh Tani', jumlah: 209 },
    { jenis: 'Buruh Perusahaan', jumlah: 48 },
    { jenis: 'Pedagang/Jasa', jumlah: 25 },
    { jenis: 'Peternak', jumlah: 12 },
    { jenis: 'Tukang/Kuli Bangunan', jumlah: 24 },
    { jenis: 'Lainnya', jumlah: 256 },
    { jenis: 'Tidak bekerja/Pengangguran', jumlah: 67 },
  ];

  const perkawinanData = [
    { status: 'Belum Kawin', total: 0, icon: '/images/aset_infografis/belumkawin.png' },
    { status: 'Kawin', total: 0, icon: '/images/aset_infografis/kawin.png' },
    { status: 'Cerai Mati', total: 0, icon: '/images/aset_infografis/mt.png' },
    { status: 'Kawin Tercatat', total: 0, icon: '/images/aset_infografis/kawintercatat.png' },
    { status: 'Cerai Hidup', total: 0, icon: '/images/aset_infografis/Cerai Hidup.png' },
    { status: 'Kawin Tidak Tercatat', total: 0, icon: '/images/aset_infografis/kawin tak tercatat.png' },
  ];

  const agamaData = [
    { agama: 'Islam', total: 0, icon: '/images/aset_infografis/islam.png' },
    { agama: 'Kristen', total: 0, icon: '/images/aset_infografis/kristen.png' },
    { agama: 'Katolik', total: 0, icon: '/images/aset_infografis/katolik.png' },
    { agama: 'Hindu', total: 0, icon: '/images/aset_infografis/hindu.png' },
    { agama: 'Budha', total: 0, icon: '/images/aset_infografis/budha.png' },
  ];

  const stuntingData = [
    { name: 'Dusun 1', count: 12, icon: '/images/aset_infografis/1.png' },
    { name: 'Dusun 2', count: 8, icon: '/images/aset_infografis/3.png' },
    { name: 'Dusun 3', count: 5, icon: '/images/aset_infografis/1.png' },
    { name: 'Dusun 4', count: 9, icon: '/images/aset_infografis/3.png' },
    { name: 'Dusun 5', count: 7, icon: '/images/aset_infografis/1.png' },
    { name: 'Dusun 6', count: 3, icon: '/images/aset_infografis/3.png' },
    { name: 'Dusun 7', count: 4, icon: '/images/aset_infografis/3.png' },
  ];

  const bansosData = [
    { name: 'Program Keluarga Harapan', count: 120, icon: '/images/aset_infografis/pkh.png' },
    { name: 'Bantuan Pangan Non Tunai', count: 98, icon: '/images/aset_infografis/bpnt.png' },
    { name: 'Program Indonesia Pintar', count: 75, icon: '/images/aset_infografis/pip.png' },
    { name: 'Kartu Indonesia Sehat', count: 156, icon: '/images/aset_infografis/kis.png' },
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
            <span className="text-[#1E3A5F] font-medium">Infografis</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">Infografis Desa Ratu Abung</h1>
          <p className="text-gray-600 text-base md:text-lg">Visualisasi data dan informasi desa dalam bentuk infografis interaktif</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-wrap gap-3">

            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-2.5 rounded-lg border font-medium transition-all ${
                  activeTab === tab.name
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* APBDes Section */}
      {activeTab === 'APBDes' && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {/* Header with Title and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
              {/* Left - Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
                  APB Desa Ratu Abung
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Anggaran Pendapatan dan Belanja Desa
                </p>
              </div>

              {/* Right - Filter Tahun */}
              <div className="flex-shrink-0">
                <select className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] text-sm min-w-[200px]">
                  <option value="">Pilih Filter Tahun</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            {/* APBDes Content */}
            <div className="space-y-6">
              {/* Pendapatan & Belanja */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Pendapatan</p>
                  <p className="text-3xl font-bold text-[#1E3A5F]">Rp 0,00</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Belanja</p>
                  <p className="text-3xl font-bold text-[#1E3A5F]">Rp 0,00</p>
                </div>
              </div>

              {/* Pembiayaan */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-[#1E3A5F] mb-6">Pembiayaan</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm font-medium text-gray-600 mb-2">Penerimaan</p>
                    <p className="text-3xl font-bold text-[#1E3A5F]">Rp 0,00</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm font-medium text-gray-600 mb-2">Pengeluaran</p>
                    <p className="text-3xl font-bold text-[#1E3A5F]">Rp 0,00</p>
                  </div>
                </div>
              </div>

              {/* Surplus/Defisit */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-[#1E3A5F]">Surplus/Defisit</h4>
                  <p className="text-3xl font-bold text-[#1E3A5F]">Rp 0,00</p>
                </div>
              </div>

              {/* Grafik Pendapatan dan Belanja */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-[#1E3A5F] mb-6">
                  Pendapatan dan Belanja Desa dari Tahun ke Tahun
                </h4>
                
                <div className="flex items-center justify-center py-12 text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-sm">Belum ada data pendapatan dan belanja</p>
                  </div>
                </div>
              </div>

              {/* Pendapatan Desa */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-[#1E3A5F] mb-6">
                  Pendapatan Desa
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Uraian</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Anggaran (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Realisasi (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Lebih/(Kurang)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td colSpan="4" className="py-8 text-center text-gray-400">
                          Belum ada data pendapatan desa
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Belanja Desa */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-[#1E3A5F] mb-6">
                  Belanja Desa
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Uraian</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Anggaran (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Realisasi (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Lebih/(Kurang)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td colSpan="4" className="py-8 text-center text-gray-400">
                          Belum ada data belanja desa
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pembiayaan Desa */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-[#1E3A5F] mb-6">
                  Pembiayaan Desa
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Uraian</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Anggaran (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Realisasi (Rp)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Lebih/(Kurang)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td colSpan="4" className="py-8 text-center text-gray-400">
                          Belum ada data pembiayaan desa
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demografi Section */}
      {activeTab === 'Penduduk' && (
        <>
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left Content */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
                    Demografi Penduduk
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Memberikan informasi lengkap mengenai karakteristik demografi penduduk suatu wilayah. Mulai dari jumlah penduduk, usia, jenis kelamin, tingkat pendidikan, pekerjaan, agama, dan aspek penting lainnya yang menggambarkan komposisi populasi secara rinci.
                  </p>
                </div>

                {/* Right Illustration */}
                <div className="flex justify-center lg:justify-end">
                  <img 
                    src="/images/aset_infografis/Demografi.png" 
                    alt="Demografi Illustration" 
                    className="w-full max-w-md"
                  />
                </div>
              </div>

          {/* Population Cards */}
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">
            Jumlah Penduduk dan Kepala Keluarga
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <img 
                src="/images/aset_infografis/Total Penduduk.png" 
                alt="Population" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Penduduk</p>
                <p className="text-3xl font-bold">
                  <span className="text-[#1E3A5F] counter" data-target={mockData.totalPenduduk}>0</span>
                  <span className="text-gray-700 text-lg"> Jiwa</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <img 
                src="/images/aset_infografis/kepala_keluarga.png" 
                alt="Family" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Kepala Keluarga</p>
                <p className="text-3xl font-bold">
                  <span className="text-[#1E3A5F] counter" data-target={mockData.kepalaKeluarga}>0</span>
                  <span className="text-gray-700 text-lg"> KK</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <img 
                src="/images/aset_infografis/Perempuan.png" 
                alt="Female" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Perempuan</p>
                <p className="text-3xl font-bold">
                  <span className="text-[#1E3A5F] counter" data-target={mockData.perempuan}>0</span>
                  <span className="text-gray-700 text-lg"> Jiwa</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <img 
                src="/images/aset_infografis/laki-laki.png" 
                alt="Male" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Laki-Laki</p>
                <p className="text-3xl font-bold">
                  <span className="text-[#1E3A5F] counter" data-target={mockData.lakiLaki}>0</span>
                  <span className="text-gray-700 text-lg"> Jiwa</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section - Berdasarkan Kelompok Umur */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">
            Berdasarkan Kelompok Umur
          </h4>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="h-[420px]">
              <canvas id="ageGroupChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* By Village Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Dusun</h4>
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3 flex justify-center">
              <div style={{ width: '100%', maxWidth: '550px', position: 'relative' }}>
                <canvas id="dusunChart"></canvas>
              </div>
            </div>
            <div className="md:col-span-2 space-y-2 md:pl-4">
              <p className="text-xl font-bold text-gray-800 mb-4">Keterangan:</p>
              <div className="space-y-1">
                {['Dusun 1: 512 Jiwa', 'Dusun 2: 489 Jiwa', 'Dusun 3: 467 Jiwa', 'Dusun 4: 423 Jiwa', 'Dusun 5: 401 Jiwa', 'Dusun 6: 389 Jiwa', 'Dusun 7: 473 Jiwa'].map((text, i) => (
                  <p key={i} className="text-base text-gray-700">{text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occupation Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pekerjaan</h4>
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Table with Scroll */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1E3A5F] text-white">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Jenis Pekerjaan</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Jumlah</th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-[420px] overflow-y-auto">
                  <table className="w-full">
                    <tbody>
                      {allPekerjaan.map((job, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-sm text-gray-700">{job.jenis}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-center">{job.jumlah}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Cards Grid (2 columns, 3 rows) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {topPekerjaan.slice(0, 6).map((job, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                    <p className="text-sm text-gray-600 font-medium mb-2">{job.nama}</p>
                    <p className="text-4xl font-bold text-[#1E3A5F]">{job.total}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pendidikan</h4>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="h-[550px]">
              <canvas id="educationChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Marital Status Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Perkawinan</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perkawinanData.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16">
                  <img src={item.icon} alt={item.status} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-600">{item.status}</p>
                  <p className="text-3xl font-bold text-[#1E3A5F]">{item.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Religion Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Agama</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agamaData.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16">
                  <img src={item.icon} alt={item.agama} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-600">{item.agama}</p>
                  <p className="text-3xl font-bold text-[#1E3A5F]">{item.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* Stunting Section */}
      {activeTab === 'Stunting' && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8">Jumlah Stunting Per Dusun</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stuntingData.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-600">{item.name}</p>
                    <p className="text-3xl font-bold text-[#1E3A5F]">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bansos Section */}
      {activeTab === 'Bansos' && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8">Jumlah Bantuan Sosial</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {bansosData.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-600">{item.name}</p>
                    <p className="text-3xl font-bold text-[#1E3A5F]">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IDM & SDGs Placeholder */}
      {(activeTab === 'IDM' || activeTab === 'SDGs') && (
        <section id={activeTab === 'IDM' ? 'idm' : 'sdgs'} className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <div className="bg-white rounded-xl border border-gray-200 p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
                {activeTab === 'IDM' ? 'Indeks Desa Membangun' : 'Sustainable Development Goals'}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">Data {activeTab} akan tersedia segera.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default InfografisPage;

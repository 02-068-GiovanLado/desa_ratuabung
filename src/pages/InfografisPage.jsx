import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

const InfografisPage = () => {
  const chartInstances = useRef({});
  const [activeTab, setActiveTab] = useState('Penduduk');

  // Mock data
  const mockData = {
    totalPenduduk: 3154,
    kepalaKeluarga: 904,
    perempuan: 1589,
    lakiLaki: 1565,
  };

  const tabs = [
    { name: 'Penduduk', icon: '👥' },
    { name: 'APBDes', icon: '📷' },
    { name: 'Stunting', icon: '📊' },
    { name: 'Bansos', icon: '📦' },
    { name: 'IDM', icon: '👑' },
    { name: 'SDGs', icon: '🎯' },
  ];

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
            data: [245, 189, 876, 512, 678, 45, 123, 234, 34, 12],
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
    { nama: 'Petani', total: 892 },
    { nama: 'Buruh Tani', total: 567 },
    { nama: 'Pedagang', total: 234 },
    { nama: 'Wirausaha', total: 189 },
    { nama: 'Ibu Rumah Tangga', total: 678 },
    { nama: 'Karyawan Swasta', total: 156 },
  ];

  const allPekerjaan = [
    { jenis: 'Petani', jumlah: 892 },
    { jenis: 'Buruh Tani', jumlah: 567 },
    { jenis: 'Pedagang', jumlah: 234 },
    { jenis: 'Pegawai Negeri Sipil (PNS)', jumlah: 98 },
    { jenis: 'Guru', jumlah: 87 },
    { jenis: 'Tenaga Kesehatan', jumlah: 45 },
    { jenis: 'Karyawan Swasta', jumlah: 156 },
    { jenis: 'Wirausaha', jumlah: 189 },
    { jenis: 'Sopir/Driver', jumlah: 76 },
    { jenis: 'Nelayan', jumlah: 34 },
    { jenis: 'Ibu Rumah Tangga', jumlah: 678 },
    { jenis: 'Pelajar/Mahasiswa', jumlah: 245 },
    { jenis: 'Tidak Bekerja', jumlah: 123 },
  ];

  const perkawinanData = [
    { status: 'Belum Kawin', total: 1245, icon: '/images/aset_infografis/belumkawin.png' },
    { status: 'Kawin', total: 1678, icon: '/images/aset_infografis/kawin.png' },
    { status: 'Cerai Mati', total: 145, icon: '/images/aset_infografis/mt.png' },
    { status: 'Kawin Tercatat', total: 89, icon: '/images/aset_infografis/kawintercatat.png' },
    { status: 'Cerai Hidup', total: 67, icon: '/images/aset_infografis/Cerai Hidup.png' },
    { status: 'Kawin Tidak Tercatat', total: 34, icon: '/images/aset_infografis/kawin tak tercatat.png' },
  ];

  const agamaData = [
    { agama: 'Islam', total: 2987, icon: '/images/aset_infografis/islam.png' },
    { agama: 'Kristen', total: 123, icon: '/images/aset_infografis/kristen.png' },
    { agama: 'Katolik', total: 34, icon: '/images/aset_infografis/katolik.png' },
    { agama: 'Hindu', total: 7, icon: '/images/aset_infografis/hindu.png' },
    { agama: 'Budha', total: 3, icon: '/images/aset_infografis/budha.png' },
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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Title and Tabs */}
      <section className="bg-white py-6 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                INFOGRAFIS
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                DESA BANDAREJO
              </h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex flex-col items-center justify-center px-6 py-3 rounded-lg border-2 transition-all min-w-[100px] ${
                    activeTab === tab.name
                      ? 'bg-white border-primary shadow-md'
                      : 'bg-gray-50 border-gray-300 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <span className={`text-sm font-medium ${
                    activeTab === tab.name ? 'text-primary' : 'text-gray-600'
                  }`}>
                    {tab.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APBDes Section */}
      {activeTab === 'APBDes' && (
        <section className="bg-white py-12 px-8 md:px-12 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            {/* Header with Title and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              {/* Left - Title */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  APB Desa Bandar Rejo
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Desa Bandar Rejo, Kecamatan Batanghari, Kabupaten Lampung Timur, Provinsi Lampung
                </p>
              </div>

              {/* Right - Filter Tahun */}
              <div className="flex-shrink-0">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-w-[200px]">
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
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">● Pendapatan</p>
                  <p className="text-3xl font-bold text-gray-800">Rp0,00</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">● Belanja</p>
                  <p className="text-3xl font-bold text-gray-800">Rp0,00</p>
                </div>
              </div>

              {/* Pembiayaan */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-6">Pembiayaan</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">● Penerimaan</p>
                    <p className="text-3xl font-bold text-gray-800">Rp0,00</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">● Pengeluaran</p>
                    <p className="text-3xl font-bold text-gray-800">Rp0,00</p>
                  </div>
                </div>
              </div>

              {/* Surplus/Defisit */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-800">Surplus/Defisit</h4>
                  <p className="text-3xl font-bold text-gray-900">Rp0,00</p>
                </div>
              </div>

              {/* Grafik Pendapatan dan Belanja */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-primary mb-6">
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
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-primary mb-6">
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
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-primary mb-6">
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
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-primary mb-6">
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
          <section className="bg-white py-6 px-8 md:px-12 lg:px-16">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left Content */}
                <div>
                  <h3 className="text-4xl font-bold text-primary mb-4">
                    DEMOGRAFI PENDUDUK
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
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
          <h4 className="text-3xl font-bold text-primary mb-6">
            Jumlah Penduduk dan Kepala Keluarga
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
              <img 
                src="/images/aset_infografis/Total Penduduk.png" 
                alt="Population" 
                className="w-24 h-24 object-contain"
              />
              <div>
                <p className="text-xl text-gray-600 mb-1">TOTAL PENDUDUK</p>
                <p className="text-4xl font-bold">
                  <span className="text-primary counter" data-target={mockData.totalPenduduk}>0</span>
                  <span className="text-gray-700"> Jiwa</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
              <img 
                src="/images/aset_infografis/kepala_keluarga.png" 
                alt="Family" 
                className="w-24 h-24 object-contain"
              />
              <div>
                <p className="text-xl text-gray-600 mb-1">KEPALA KELUARGA</p>
                <p className="text-4xl font-bold">
                  <span className="text-primary counter" data-target={mockData.kepalaKeluarga}>0</span>
                  <span className="text-gray-700"> KK</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
              <img 
                src="/images/aset_infografis/Perempuan.png" 
                alt="Female" 
                className="w-24 h-24 object-contain"
              />
              <div>
                <p className="text-xl text-gray-600 mb-1">PEREMPUAN</p>
                <p className="text-4xl font-bold">
                  <span className="text-primary counter" data-target={mockData.perempuan}>0</span>
                  <span className="text-gray-700"> Jiwa</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
              <img 
                src="/images/aset_infografis/laki-laki.png" 
                alt="Male" 
                className="w-24 h-24 object-contain"
              />
              <div>
                <p className="text-xl text-gray-600 mb-1">LAKI-LAKI</p>
                <p className="text-4xl font-bold">
                  <span className="text-primary counter" data-target={mockData.lakiLaki}>0</span>
                  <span className="text-gray-700"> Jiwa</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section - Berdasarkan Kelompok Umur */}
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">
            Berdasarkan Kelompok Umur
          </h4>
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="h-[420px]">
              <canvas id="ageGroupChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* By Village Section */}
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">Berdasarkan Dusun</h4>
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
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">Berdasarkan Pekerjaan</h4>
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Table with Scroll */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-primary text-white">
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
                  <div key={i} className="bg-gray-50 rounded-lg shadow-sm p-6 text-center border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium mb-2">{job.nama}</p>
                    <p className="text-5xl font-bold text-gray-800">{job.total}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">Berdasarkan Pendidikan</h4>
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="h-[550px]">
              <canvas id="educationChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Marital Status Section */}
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">Berdasarkan Perkawinan</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perkawinanData.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
                <div className="flex-shrink-0 w-20 h-20">
                  <img src={item.icon} alt={item.status} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-gray-700">{item.status}</p>
                  <p className="text-3xl font-semibold text-primary">{item.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Religion Section */}
      <section className="bg-white py-8 px-8 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <h4 className="text-3xl font-bold text-primary mb-6">Berdasarkan Agama</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agamaData.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
                <div className="flex-shrink-0 w-20 h-20">
                  <img src={item.icon} alt={item.agama} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-gray-700">{item.agama}</p>
                  <p className="text-3xl font-semibold text-primary">{item.total}</p>
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
        <section className="bg-white py-12 px-8 md:px-12 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-4xl font-bold text-primary mb-8">Jumlah Stunting Per Dusun</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stuntingData.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-gray-700">{item.name}</p>
                    <p className="text-3xl font-semibold text-primary">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bansos Section */}
      {activeTab === 'Bansos' && (
        <section className="bg-white py-12 px-8 md:px-12 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-4xl font-bold text-primary mb-8">Jumlah Bantuan Sosial</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {bansosData.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg shadow-sm p-6 flex items-center gap-6 border border-gray-200">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-gray-700">{item.name}</p>
                    <p className="text-3xl font-semibold text-primary">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IDM & SDGs Placeholder */}
      {(activeTab === 'IDM' || activeTab === 'SDGs') && (
        <section className="bg-white py-12 px-8 md:px-12 lg:px-16">
          <div className="container mx-auto max-w-7xl text-center">
            <h3 className="text-4xl font-bold text-primary mb-4">
              {activeTab === 'IDM' ? 'Indeks Desa Membangun' : 'Sustainable Development Goals'}
            </h3>
            <p className="text-gray-600 text-lg">Data {activeTab} akan tersedia segera.</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default InfografisPage;

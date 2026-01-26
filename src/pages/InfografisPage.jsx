import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const InfografisPage = () => {
  const location = useLocation();
  const chartInstances = useRef({});
  const [activeTab, setActiveTab] = useState('Penduduk');
  const [sdgsData, setSdgsData] = useState([]);
  const [loadingSDGs, setLoadingSDGs] = useState(false);
  
  // Data dari API
  const [pendudukData, setPendudukData] = useState(null);
  const [loadingPenduduk, setLoadingPenduduk] = useState(true);

  const [apbdesData, setApbdesData] = useState(null);
  const [loadingAPBDes, setLoadingAPBDes] = useState(false);
  
  const [stuntingData, setStuntingData] = useState(null);
  const [loadingStunting, setLoadingStunting] = useState(false);
  
  const [bansosData, setBansosData] = useState(null);
  const [loadingBansos, setLoadingBansos] = useState(false);
  
  const [idmData, setIdmData] = useState(null);
  const [loadingIDM, setLoadingIDM] = useState(false);

  const API_URL = 'http://localhost:3000/api';

  const tabs = [
    { name: 'Penduduk' },
    { name: 'APBDes' },
    { name: 'Stunting' },
    { name: 'Bansos' },
    { name: 'IDM' },
    { name: 'SDGs' },
  ];

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'idm') {
      setActiveTab('IDM');
    } else if (hash === 'sdgs') {
      setActiveTab('SDGs');
    }
  }, [location]);

  // Fetch Penduduk Data dari API
  useEffect(() => {
    const fetchPendudukData = async () => {
      try {
        setLoadingPenduduk(true);
        
        const response = await fetch(`${API_URL}/infografis/type/Penduduk`);
        if (!response.ok) throw new Error('Gagal memuat data penduduk');
        
        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          const latestData = result.data[0];
          const parsedData = typeof latestData.data === 'string' 
            ? JSON.parse(latestData.data) 
            : latestData.data;
          
          setPendudukData(parsedData);
        }
      } catch (err) {
        console.error('Error fetching penduduk:', err);
        setPendudukData(null);
      } finally {
        setLoadingPenduduk(false);
      }
    };

    if (activeTab === 'Penduduk') {
      fetchPendudukData();
    }
  }, [activeTab]);

  // Fetch SDGs Data
  useEffect(() => {
    if (activeTab === 'SDGs') {
      fetchSDGsData();
    }
  }, [activeTab]);

  const fetchSDGsData = async () => {
    try {
      setLoadingSDGs(true);
      const response = await fetch(`${API_URL}/infografis/type/SDGs`);
      
      if (!response.ok) {
        setSdgsData([]);
        return;
      }

      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        setSdgsData(data.goals || []);
      }
    } catch (error) {
      console.error('Error fetching SDGs:', error);
      setSdgsData([]);
    } finally {
      setLoadingSDGs(false);
    }
  };

  useEffect(() => {
    if (!pendudukData) return;

    const destroyChart = (chartId) => {
      if (chartInstances.current[chartId]) {
        chartInstances.current[chartId].destroy();
        delete chartInstances.current[chartId];
      }
    };

    // Age Group Chart
    const ageCtx = document.getElementById('ageGroupChart');
    if (ageCtx && pendudukData) {
      destroyChart('ageGroupChart');
      
      const ageRanges = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'];
      const lakiData = ageRanges.map(range => pendudukData[`umur_${range}_l`] || 0);
      const perempuanData = ageRanges.map(range => pendudukData[`umur_${range}_p`] || 0);

      const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ageRanges,
          datasets: [
            {
              label: 'Laki-laki',
              data: lakiData,
              backgroundColor: 'rgba(44, 121, 97, 0.8)',
            },
            {
              label: 'Perempuan',
              data: perempuanData,
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
    if (dusunCtx && pendudukData) {
      destroyChart('dusunChart');
      
      const dusunData = [1, 2, 3, 4, 5, 6, 7].map(i => pendudukData[`dusun_${i}`] || 0);
      
      const dusunChart = new Chart(dusunCtx, {
        type: 'doughnut',
        data: {
          labels: ['Dusun 1', 'Dusun 2', 'Dusun 3', 'Dusun 4', 'Dusun 5', 'Dusun 6', 'Dusun 7'],
          datasets: [{
            data: dusunData,
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

    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) chart.destroy();
      });
      chartInstances.current = {};
    };
  }, [pendudukData, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
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

      {activeTab === 'Penduduk' && (
        <>
          {loadingPenduduk ? (
            <section className="bg-white py-8">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="w-12 h-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data penduduk...</p>
              </div>
            </section>
          ) : !pendudukData ? (
            <section className="bg-white py-8">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-500">Belum ada data penduduk. Silakan input di admin dashboard terlebih dahulu.</p>
              </div>
            </section>
          ) : (
            <>
              <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Jumlah Penduduk dan Kepala Keluarga</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/Total Penduduk.png" alt="Population" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Penduduk</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.totalPenduduk || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/kepala_keluarga.png" alt="Family" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Kepala Keluarga</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.kepalaKeluarga || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> KK</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/Perempuan.png" alt="Female" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Perempuan</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.perempuan || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/laki-laki.png" alt="Male" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Laki-Laki</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.lakiLaki || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Kelompok Umur</h4>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="h-105">
                      <canvas id="ageGroupChart"></canvas>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Dusun</h4>
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-3 flex justify-center">
                      <div style={{ width: '100%', maxWidth: '550px', position: 'relative' }}>
                        <canvas id="dusunChart"></canvas>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-xl font-bold text-gray-800 mb-4">Keterangan:</p>
                      {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
                        <p key={dusun} className="text-base text-gray-700">
                          <span className="font-semibold">Dusun {dusun}:</span> {(pendudukData?.[`dusun_${dusun}`] || 0).toLocaleString('id-ID')} Jiwa
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pekerjaan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Petani', 'Buruh Tani', 'PNS', 'Buruh Pabrik', 'Pedagang', 'Pegawai Swasta', 'Tukang', 'Lainnya'].map(job => (
                      <div key={job} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{job}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`pekerjaan_${job}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pendidikan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Tidak Sekolah', 'SD', 'SLTP', 'SLTA', 'Diploma', 'S1', 'S2', 'S3'].map(edu => (
                      <div key={edu} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{edu}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`pendidikan_${edu.replace(/\s/g, '_')}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Perkawinan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'].map(status => (
                      <div key={status} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{status}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`perkawinan_${status.replace(/\s/g, '_')}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Agama</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'].map(agama => (
                      <div key={agama} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{agama}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`agama_${agama}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {activeTab === 'SDGs' && (
        <section id="sdgs" className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Sustainable Development Goals</h3>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">Capaian Desa Ratu Abung dalam mendukung Tujuan Pembangunan Berkelanjutan</p>
            </div>

            {loadingSDGs ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Memuat data SDGs...</p>
                </div>
              </div>
            ) : sdgsData.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Belum ada data SDGs. Silakan input di admin dashboard terlebih dahulu.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sdgsData.map((goal) => (
                  <div key={goal.id} className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-20 h-20">
                        <img src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(goal.id).padStart(2, '0')}.jpg`} alt={`SDG ${goal.id}`} className="w-full h-full object-cover rounded-lg shadow-sm" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base mb-2 leading-tight min-h-10">{goal.title}</h4>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-gray-900">{goal.progress}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {['APBDes', 'Stunting', 'Bansos', 'IDM'].includes(activeTab) && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <div className="bg-white rounded-xl border border-gray-200 p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">Data {activeTab}</h3>
              <p className="text-gray-500 text-base">Belum ada data {activeTab}. Silakan input di admin dashboard terlebih dahulu.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default InfografisPage;
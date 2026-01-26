import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const InfografisPage = () => {
  const location = useLocation();
  const chartInstances = useRef({});
  const [activeTab, setActiveTab] = useState('Penduduk');
  const [sdgsData, setSdgsData] = useState([]);
  const [loadingSDGs, setLoadingSDGs] = useState(false);

  const [pendudukData, setPendudukData] = useState(null);
  const [loadingPenduduk, setLoadingPenduduk] = useState(true);

  const API_URL = 'http://localhost:3000/api';

  const tabs = [
    { name: 'Penduduk' },
    { name: 'APBDes' },
    { name: 'Stunting' },
    { name: 'Bansos' },
    { name: 'IDM' },
    { name: 'SDGs' },
  ];

  /* ================= HASH NAVIGATION ================= */
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'idm') setActiveTab('IDM');
    if (hash === 'sdgs') setActiveTab('SDGs');
  }, [location]);

  /* ================= FETCH PENDUDUK ================= */
  useEffect(() => {
    const fetchPendudukData = async () => {
      try {
        setLoadingPenduduk(true);
        const res = await fetch(`${API_URL}/infografis/type/Penduduk`);
        if (!res.ok) throw new Error('Gagal memuat data');
        const json = await res.json();

        if (json.data?.length) {
          const parsed =
            typeof json.data[0].data === 'string'
              ? JSON.parse(json.data[0].data)
              : json.data[0].data;
          setPendudukData(parsed);
        }
      } catch {
        setPendudukData(null);
      } finally {
        setLoadingPenduduk(false);
      }
    };

    if (activeTab === 'Penduduk') fetchPendudukData();
  }, [activeTab]);

  /* ================= FETCH SDGS ================= */
  const fetchSDGsData = async () => {
    try {
      setLoadingSDGs(true);
      const res = await fetch(`${API_URL}/infografis/type/SDGs`);
      if (!res.ok) return setSdgsData([]);
      const json = await res.json();

      const parsed =
        typeof json.data[0].data === 'string'
          ? JSON.parse(json.data[0].data)
          : json.data[0].data;

      setSdgsData(parsed.goals || []);
    } catch {
      setSdgsData([]);
    } finally {
      setLoadingSDGs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'SDGs') fetchSDGsData();
  }, [activeTab]);

  /* ================= CHART ================= */
  useEffect(() => {
    if (!pendudukData) return;

    const destroyChart = (id) => {
      if (chartInstances.current[id]) {
        chartInstances.current[id].destroy();
        delete chartInstances.current[id];
      }
    };

    // Chart Kelompok Umur
    const ageCtx = document.getElementById('ageGroupChart');
    if (ageCtx) {
      destroyChart('ageGroupChart');
      chartInstances.current.ageGroupChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65+'],
          datasets: [
            {
              label: 'Laki-laki',
              data: [71,123,104,109,109,79,81,88,80,106,72,69,60,65],
              backgroundColor: 'rgba(44,121,97,.8)',
            },
            {
              label: 'Perempuan',
              data: [51,84,96,85,75,59,71,84,99,90,65,45,37,74],
              backgroundColor: 'rgba(251,146,60,.8)',
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    // Chart Dusun
    const dusunCtx = document.getElementById('dusunChart');
    if (dusunCtx) {
      destroyChart('dusunChart');
      chartInstances.current.dusunChart = new Chart(dusunCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Bangun Rejo','Tanjung Rejo','Mekar Jaya',
            'Bumi Rejo 1','Bumi Rejo 2','Purwo Sari','Mekar Sari'
          ],
          datasets: [{
            data: [259,386,289,279,359,337,266],
            backgroundColor: [
              'rgba(44,121,97,.8)','rgba(251,146,60,.8)',
              'rgba(59,130,246,.8)','rgba(139,92,246,.8)',
              'rgba(236,72,153,.8)','rgba(234,179,8,.8)',
              'rgba(239,68,68,.8)',
            ],
          }],
        },
      });
    }

    return () => {
      Object.values(chartInstances.current).forEach((c) => c.destroy());
      chartInstances.current = {};
    };
  }, [pendudukData]);

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-3 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.name}
              onClick={() => setActiveTab(t.name)}
              className={`px-6 py-2 rounded-lg border ${
                activeTab === t.name
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'Penduduk' && (
        <>
          {loadingPenduduk ? (
            <p className="text-center py-10">Memuat data...</p>
          ) : !pendudukData ? (
            <p className="text-center py-10 text-gray-500">
              Data penduduk belum tersedia
            </p>
          ) : (
            <>
              <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
                  <InfoCard label="Total Penduduk" value={pendudukData.totalPenduduk} unit="Jiwa" />
                  <InfoCard label="Kepala Keluarga" value={pendudukData.kepalaKeluarga} unit="KK" />
                  <InfoCard label="Perempuan" value={pendudukData.perempuan} unit="Jiwa" />
                  <InfoCard label="Laki-Laki" value={pendudukData.lakiLaki} unit="Jiwa" />
                </div>
              </section>

              <ChartSection title="Berdasarkan Kelompok Umur" canvasId="ageGroupChart" />
              <ChartSection title="Berdasarkan Dusun" canvasId="dusunChart" />
            </>
          )}
        </>
      )}
    </div>
  );
};

/* ================= KOMPONEN BANTU ================= */
const InfoCard = ({ label, value, unit }) => (
  <div className="bg-white rounded-xl p-6 border text-center">
    <p className="text-gray-600">{label}</p>
    <p className="text-3xl font-bold text-[#1E3A5F]">
      {(value || 0).toLocaleString('id-ID')} {unit}
    </p>
  </div>
);

const ChartSection = ({ title, canvasId }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <h4 className="text-2xl font-bold text-[#1E3A5F] mb-4">{title}</h4>
      <div className="bg-white p-6 rounded-xl border h-96">
        <canvas id={canvasId}></canvas>
      </div>
    </div>
  </section>
);

export default InfografisPage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InfografisPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [infografis, setInfografis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedType, setSelectedType] = useState('Penduduk');
  const [formData, setFormData] = useState({});

  const API_URL = 'http://localhost:3000/api';
  const itemsPerPage = 10;

  const infografisTypes = [
    { value: 'Penduduk', label: 'Data Penduduk' },
    { value: 'APBDes', label: 'APB Desa' },
    { value: 'Stunting', label: 'Data Stunting' },
    { value: 'Bansos', label: 'Data Bansos' },
    { value: 'IDM', label: 'IDM' },
    { value: 'SDGs', label: 'SDGs' },
  ];

  useEffect(() => {
    fetchInfografis();
  }, []);

  const fetchInfografis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/infografis`);
      if (!response.ok) throw new Error('Gagal memuat infografis');
      const data = await response.json();
      setInfografis(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormByType = () => {
    switch (selectedType) {
      case 'Penduduk':
        return <FormPenduduk formData={formData} setFormData={setFormData} />;
      case 'APBDes':
        return <FormAPBDes formData={formData} setFormData={setFormData} />;
      case 'Stunting':
        return <FormStunting formData={formData} setFormData={setFormData} />;
      case 'Bansos':
        return <FormBansos formData={formData} setFormData={setFormData} />;
      case 'IDM':
        return <FormIDM formData={formData} setFormData={setFormData} />;
      case 'SDGs':
        return <FormSDGs formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const filteredInfografis = infografis.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInfografis.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInfografis = filteredInfografis.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setSelectedType(item.type);
      const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      setFormData(data);
    } else {
      setEditingId(null);
      setSelectedType('Penduduk');
      setFormData({});
    }
    setShowModal(true);
  };

  const generateTitle = (type) => {
    const now = new Date().toLocaleDateString('id-ID');
    return `Data ${type} - ${now}`;
  };

  const generateDescription = (type) => {
    const descriptions = {
      'Penduduk': 'Data kependudukan desa',
      'APBDes': 'Anggaran Pendapatan dan Belanja Desa',
      'Stunting': 'Data stunting berdasarkan dusun',
      'Bansos': 'Data program bantuan sosial',
      'IDM': 'Indeks Desa Membangun',
      'SDGs': 'Sustainable Development Goals'
    };
    return descriptions[type] || '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: generateTitle(selectedType),
        type: selectedType,
        data: JSON.stringify(formData),
        description: generateDescription(selectedType)
      };

      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId 
        ? `${API_URL}/infografis/${editingId}`
        : `${API_URL}/infografis`;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Gagal menyimpan infografis');
      
      await fetchInfografis();
      setShowModal(false);
      alert(editingId ? 'Infografis berhasil diupdate!' : 'Infografis berhasil ditambah!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/infografis/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Gagal menghapus infografis');
      
      await fetchInfografis();
      setDeleteId(null);
      alert('Infografis berhasil dihapus!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-[#1E3A5F]">Kelola Infografis</h1>
              <p className="text-xs text-gray-500">Desa Ratu Abung</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Data Infografis</h2>
          <p className="text-gray-600">Kelola data statistik dan infografis desa</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Cari infografis..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
            />
            <button
              onClick={() => openModal()}
              className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Infografis
            </button>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-gray-600">Total: </span>
            <span className="font-bold text-[#1E3A5F]">{infografis.length}</span>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-12 h-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat infografis...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchInfografis}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Judul</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tipe</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Deskripsi</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInfografis.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                          Tidak ada infografis
                        </td>
                      </tr>
                    ) : (
                      paginatedInfografis.map(item => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 max-w-xs truncate">{item.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-[#EFF6FF] text-[#1E3A5F] rounded-full text-xs font-medium">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.description}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => openModal(item)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setDeleteId(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Sebelumnya
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#1E3A5F] text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                {editingId ? 'Edit Infografis' : 'Tambah Infografis Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Infografis *</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setFormData({});
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                >
                  {infografisTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-6">
                {renderFormByType()}
              </div>

              <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Infografis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Hapus Infografis?</h3>
            <p className="text-gray-600 text-center mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// FORM COMPONENTS
const InputField = ({ label, value, onChange, type = 'number', placeholder = '0' }) => (
  <div className="flex items-center gap-3">
    <label className="w-32 text-sm font-medium text-gray-700">{label}</label>
    <input 
      type={type}
      value={value || ''} 
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
    />
  </div>
);

const FormPenduduk = ({ formData, setFormData }) => {
  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">1. Jumlah Penduduk & Kepala Keluarga</h4>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Total Penduduk" value={formData.totalPenduduk} onChange={(e) => updateField('totalPenduduk', e.target.value)} />
          <InputField label="Kepala Keluarga" value={formData.kepalaKeluarga} onChange={(e) => updateField('kepalaKeluarga', e.target.value)} />
          <InputField label="Laki-Laki" value={formData.lakiLaki} onChange={(e) => updateField('lakiLaki', e.target.value)} />
          <InputField label="Perempuan" value={formData.perempuan} onChange={(e) => updateField('perempuan', e.target.value)} />
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">2. Kelompok Umur</h4>
        <div className="space-y-2">
          {['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'].map(range => (
            <div key={range} className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="font-medium text-gray-700">{range} tahun</span>
              <input type="number" placeholder="L" value={formData[`umur_${range}_l`] || ''} onChange={(e) => updateField(`umur_${range}_l`, e.target.value)} className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" />
              <input type="number" placeholder="P" value={formData[`umur_${range}_p`] || ''} onChange={(e) => updateField(`umur_${range}_p`, e.target.value)} className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">3. Berdasarkan Dusun</h4>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
            <InputField key={dusun} label={`Dusun ${dusun}`} value={formData[`dusun_${dusun}`]} onChange={(e) => updateField(`dusun_${dusun}`, e.target.value)} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">4. Berdasarkan Pekerjaan</h4>
        <div className="space-y-2">
          {['Petani', 'Buruh Tani', 'PNS', 'Buruh Pabrik', 'Pedagang', 'Pegawai Swasta', 'Tukang', 'Lainnya'].map(job => (
            <InputField key={job} label={job} value={formData[`pekerjaan_${job}`]} onChange={(e) => updateField(`pekerjaan_${job}`, e.target.value)} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">5. Berdasarkan Pendidikan</h4>
        <div className="space-y-2">
          {['Tidak Sekolah', 'SD', 'SLTP', 'SLTA', 'Diploma', 'S1', 'S2', 'S3'].map(edu => (
            <InputField key={edu} label={edu} value={formData[`pendidikan_${edu}`]} onChange={(e) => updateField(`pendidikan_${edu}`, e.target.value)} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">6. Berdasarkan Perkawinan</h4>
        <div className="space-y-2">
          {['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'].map(status => (
            <InputField key={status} label={status} value={formData[`perkawinan_${status}`]} onChange={(e) => updateField(`perkawinan_${status}`, e.target.value)} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">7. Berdasarkan Agama</h4>
        <div className="space-y-2">
          {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'].map(agama => (
            <InputField key={agama} label={agama} value={formData[`agama_${agama}`]} onChange={(e) => updateField(`agama_${agama}`, e.target.value)} />
          ))}
        </div>
      </section>
    </div>
  );
};

const FormAPBDes = ({ formData, setFormData }) => {
  const updateField = (key, value) => {
    const numValue = parseInt(value) || 0;
    const newData = { ...formData, [key]: numValue };
    
    // Hitung surplus/defisit otomatis
    // Surplus/Defisit = (Pendapatan + Penerimaan) - (Belanja + Pengeluaran)
    const pendapatan = newData.pendapatan || 0;
    const belanja = newData.belanja || 0;
    const penerimaan = newData.penerimaan || 0;
    const pengeluaran = newData.pengeluaran || 0;
    
    newData.surplus_defisit = (pendapatan + penerimaan) - (belanja + pengeluaran);
    
    setFormData(newData);
  };

  const pendapatan = formData.pendapatan || 0;
  const belanja = formData.belanja || 0;
  const penerimaan = formData.penerimaan || 0;
  const pengeluaran = formData.pengeluaran || 0;
  const surplus_defisit = (pendapatan + penerimaan) - (belanja + pengeluaran);

  return (
    <div className="space-y-6">
      {/* Pendapatan & Belanja */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">Pendapatan & Belanja</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pendapatan</label>
            <input 
              type="number"
              value={pendapatan || ''} 
              onChange={(e) => updateField('pendapatan', e.target.value)}
              placeholder="Masukkan jumlah pendapatan"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Belanja</label>
            <input 
              type="number"
              value={belanja || ''} 
              onChange={(e) => updateField('belanja', e.target.value)}
              placeholder="Masukkan jumlah belanja"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
        </div>
      </section>

      {/* Pembiayaan */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">Pembiayaan</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Penerimaan</label>
            <input 
              type="number"
              value={penerimaan || ''} 
              onChange={(e) => updateField('penerimaan', e.target.value)}
              placeholder="Masukkan jumlah penerimaan"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pengeluaran</label>
            <input 
              type="number"
              value={pengeluaran || ''} 
              onChange={(e) => updateField('pengeluaran', e.target.value)}
              placeholder="Masukkan jumlah pengeluaran"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
        </div>
      </section>

      {/* Surplus/Defisit - Otomatis */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Surplus/Defisit (Otomatis)</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Perhitungan: (Pendapatan + Penerimaan) - (Belanja + Pengeluaran)
          </span>
          <div className={`text-2xl font-bold ${surplus_defisit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Rp {surplus_defisit.toLocaleString('id-ID')}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded">
          <p>= ({pendapatan.toLocaleString('id-ID')} + {penerimaan.toLocaleString('id-ID')}) - ({belanja.toLocaleString('id-ID')} + {pengeluaran.toLocaleString('id-ID')})</p>
          <p>= {(pendapatan + penerimaan).toLocaleString('id-ID')} - {(belanja + pengeluaran).toLocaleString('id-ID')}</p>
        </div>
      </section>
    </div>
  );
};

const FormStunting = ({ formData, setFormData }) => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
      <InputField 
        key={dusun}
        label={`Dusun ${dusun}`} 
        value={formData[`dusun_${dusun}`]} 
        onChange={(e) => setFormData(prev => ({ ...prev, [`dusun_${dusun}`]: parseInt(e.target.value) || 0 }))} 
      />
    ))}
  </div>
);

const FormBansos = ({ formData, setFormData }) => (
  <div className="space-y-2">
    {['PKH', 'BPNT', 'PIP', 'KIS'].map(program => (
      <InputField 
        key={program}
        label={program} 
        value={formData[`program_${program}`]} 
        onChange={(e) => setFormData(prev => ({ ...prev, [`program_${program}`]: parseInt(e.target.value) || 0 }))} 
      />
    ))}
  </div>
);

const FormIDM = ({ formData, setFormData }) => (
  <div className="text-center text-gray-500 py-8">
    <p>Form IDM akan dikonfigurasi sesuai kebutuhan</p>
  </div>
);

const FormSDGs = ({ formData, setFormData }) => (
  <div className="text-center text-gray-500 py-8">
    <p>Form SDGs akan dikonfigurasi sesuai kebutuhan</p>
  </div>
);

export default InfografisPage;
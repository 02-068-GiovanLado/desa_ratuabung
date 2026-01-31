import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user, logout, token: authToken } = useAuth();
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3000/api';

  // ambil token dari context atau localStorage (fallback)
  const token = authToken || localStorage.getItem('adminToken');

  // --- State: Profil ---
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // --- State: Password ---
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Isi form dari data user yang sudah ada di context
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // --- Handler: Simpan Profil ---
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!profileData.name || !profileData.email) {
      setProfileError('Nama dan email tidak boleh kosong');
      return;
    }

    setProfileLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal memperbarui profil');
      }

      setProfileSuccess('Profil berhasil diperbarui!');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // --- Handler: Ganti Password ---
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Semua field harus diisi');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Password baru dan konfirmasi tidak cocok');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password baru minimal 6 karakter');
      return;
    }

    setPasswordLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_URL}/admin/password`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal mengubah password');
      }

      setPasswordSuccess('Password berhasil diubah!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  const PasswordInput = ({ label, value, onChange, show, onToggleShow, placeholder }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {show ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/images/Logo.png" alt="Logo" className="w-10 h-10" />
            <div className="text-left">
              <h1 className="text-lg font-bold text-[#1E3A5F]">Pengaturan</h1>
              <p className="text-xs text-gray-500">Desa Ratu Abung</p>
            </div>
          </button>
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan</h2>
          <p className="text-gray-600">Kelola profil dan keamanan akun admin</p>
        </div>

        {/* Profil */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Profil Admin</h3>
              <p className="text-sm text-gray-500">Perbarui nama dan email akun Anda</p>
            </div>
          </div>

          <div className="p-6">
            {profileSuccess && (
              <div className="mb-5 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 text-sm">{profileSuccess}</p>
              </div>
            )}
            {profileError && (
              <div className="mb-5 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{profileError}</p>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                  placeholder="Nama admin"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                  placeholder="email@contoh.com"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleProfileSave}
                  disabled={profileLoading}
                  className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {profileLoading && (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  Simpan Profil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ganti Password */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Keamanan Akun</h3>
              <p className="text-sm text-gray-500">Ubah password untuk menjaga keamanan akun</p>
            </div>
          </div>

          <div className="p-6">
            {passwordSuccess && (
              <div className="mb-5 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 text-sm">{passwordSuccess}</p>
              </div>
            )}
            {passwordError && (
              <div className="mb-5 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{passwordError}</p>
              </div>
            )}

            <div className="space-y-5">
              <PasswordInput
                label="Password Saat Ini *"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                show={showCurrentPass}
                onToggleShow={() => setShowCurrentPass(!showCurrentPass)}
                placeholder="Masukkan password saat ini"
              />

              <PasswordInput
                label="Password Baru *"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                show={showNewPass}
                onToggleShow={() => setShowNewPass(!showNewPass)}
                placeholder="Minimal 6 karakter"
              />

              <PasswordInput
                label="Konfirmasi Password Baru *"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                show={showConfirmPass}
                onToggleShow={() => setShowConfirmPass(!showConfirmPass)}
                placeholder="Ulangi password baru"
              />

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 font-medium mb-1">Syarat password baru:</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  <li className={`flex items-center gap-1.5 ${passwordData.newPassword.length >= 6 ? 'text-green-600' : ''}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordData.newPassword.length >= 6 ? 'M5 13l4 4L19 7' : 'M12 4v16m8-8H4'} />
                    </svg>
                    Minimal 6 karakter
                  </li>
                  <li className={`flex items-center gap-1.5 ${passwordData.newPassword === passwordData.confirmPassword && passwordData.newPassword.length > 0 ? 'text-green-600' : ''}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordData.newPassword === passwordData.confirmPassword && passwordData.newPassword.length > 0 ? 'M5 13l4 4L19 7' : 'M12 4v16m8-8H4'} />
                    </svg>
                    Password baru dan konfirmasi cocok
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handlePasswordSave}
                  disabled={passwordLoading}
                  className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {passwordLoading && (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
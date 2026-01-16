import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailBeritaPage = () => {
  const { slug } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [beritaLainnya, setBeritaLainnya] = useState([]);

  useEffect(() => {
    // Mock data - sesuaikan dengan data dari BeritaPage
    const allBerita = [
      {
        id: 1,
        slug: 'kegiatan-gotong-royong',
        title: 'Kegiatan Gotong Royong Membersihkan Lingkungan Desa',
        description: 'Warga desa Bandarejo mengadakan kegiatan gotong royong rutin untuk membersihkan lingkungan desa dan fasilitas umum.',
        isi: 'Pada hari Minggu pagi, warga Desa Bandarejo secara bergotong royong membersihkan lingkungan desa. Kegiatan ini meliputi pembersihan selokan, pemangkasan pohon, dan pengecatan fasilitas umum.\n\nKepala Desa Sularto menyampaikan apresiasi kepada seluruh warga yang turut berpartisipasi. "Dengan gotong royong, kita dapat menjaga kebersihan dan keindahan desa kita bersama-sama," ujarnya.\n\nKegiatan ini diikuti oleh lebih dari 200 warga dari berbagai RT dan RW. Hasilnya, lingkungan desa menjadi lebih bersih dan nyaman.',
        author: 'Admin Desa',
        date: '2026-01-10',
        views: 150,
        image: '/images/berita-1.jpg'
      },
      {
        id: 2,
        slug: 'penyuluhan-pertanian',
        title: 'Penyuluhan Pertanian Modern untuk Petani Desa',
        description: 'Dinas Pertanian mengadakan penyuluhan tentang teknik pertanian modern dan penggunaan pupuk organik yang ramah lingkungan.',
        isi: 'Dinas Pertanian Kabupaten Lampung Utara mengadakan penyuluhan pertanian modern di Balai Desa Bandarejo. Kegiatan ini diikuti oleh puluhan petani dari berbagai dusun.\n\nMateri penyuluhan meliputi teknik budidaya padi modern, penggunaan pupuk organik, dan cara pengendalian hama secara alami. Peserta juga mendapatkan bibit unggul secara gratis.\n\nDiharapkan dengan pengetahuan baru ini, produktivitas pertanian di desa dapat meningkat dan lebih ramah lingkungan.',
        author: 'Admin Desa',
        date: '2026-01-08',
        views: 230,
        image: '/images/berita-2.jpg'
      },
      {
        id: 3,
        slug: 'vaksinasi-balita',
        title: 'Posyandu Mengadakan Vaksinasi Balita',
        description: 'Posyandu desa mengadakan kegiatan vaksinasi balita gratis untuk meningkatkan kesehatan anak-anak di desa.',
        isi: 'Posyandu Desa Bandarejo mengadakan kegiatan vaksinasi balita gratis yang dilaksanakan di Puskesmas Pembantu Desa. Kegiatan ini mendapat sambutan hangat dari para ibu dengan balita.\n\nVaksinasi yang diberikan meliputi imunisasi dasar lengkap untuk balita sesuai dengan program pemerintah. Selain vaksinasi, juga dilakukan penimbangan dan pemeriksaan kesehatan balita.\n\nKegiatan ini merupakan program rutin posyandu untuk memastikan kesehatan anak-anak di desa tetap terjaga dengan baik.',
        author: 'Admin Desa',
        date: '2026-01-05',
        views: 189,
        image: '/images/berita-3.jpg'
      },
      {
        id: 4,
        slug: 'pembangunan-jalan',
        title: 'Pembangunan Jalan Desa Tahap 2 Dimulai',
        description: 'Pemerintah desa memulai tahap kedua pembangunan jalan desa untuk meningkatkan akses dan mobilitas warga.',
        isi: 'Pemerintah Desa Bandarejo resmi memulai tahap kedua pembangunan jalan desa. Proyek ini menggunakan dana dari APBD Kabupaten dan ADD (Alokasi Dana Desa).\n\nPembangunan tahap kedua ini akan mengaspal jalan sepanjang 2 kilometer yang menghubungkan Dusun 4 dan Dusun 5. Dengan adanya jalan yang baik, diharapkan akses warga ke fasilitas umum dan transportasi hasil pertanian menjadi lebih mudah.\n\nProyek ini ditargetkan selesai dalam waktu 3 bulan ke depan dengan melibatkan tenaga kerja lokal dari desa.',
        author: 'Admin Desa',
        date: '2026-01-03',
        views: 312,
        image: '/images/berita-4.jpg'
      },
      {
        id: 5,
        slug: 'pelatihan-umkm',
        title: 'Pelatihan UMKM untuk Meningkatkan Ekonomi Desa',
        description: 'Diadakan pelatihan UMKM bagi para pelaku usaha kecil menengah di desa untuk meningkatkan keterampilan dan daya saing.',
        isi: 'Dinas Koperasi dan UKM Kabupaten Lampung Utara mengadakan pelatihan UMKM di Desa Bandarejo. Pelatihan ini diikuti oleh 40 pelaku UMKM dari berbagai sektor usaha.\n\nMateri pelatihan mencakup manajemen usaha, pemasaran digital, dan pengelolaan keuangan. Peserta juga mendapat pendampingan untuk mengembangkan produk mereka.\n\nDiharapkan dengan pelatihan ini, UMKM di desa dapat berkembang dan meningkatkan kesejahteraan ekonomi masyarakat.',
        author: 'Admin Desa',
        date: '2026-01-01',
        views: 267,
        image: '/images/berita-5.jpg'
      },
      {
        id: 6,
        slug: 'festival-budaya',
        title: 'Festival Budaya Desa Meriahkan Tahun Baru',
        description: 'Masyarakat desa merayakan tahun baru dengan festival budaya yang menampilkan berbagai kesenian dan kuliner lokal.',
        isi: 'Masyarakat Desa Bandarejo merayakan tahun baru dengan menggelar festival budaya yang meriah. Acara ini menampilkan berbagai pertunjukan seni budaya lokal dan kuliner khas Lampung.\n\nFestival dibuka dengan parade kesenian tradisional yang melibatkan seluruh dusun. Berbagai stan kuliner dan kerajinan tangan juga memeriahkan acara ini.\n\nKepala Desa Sularto menyampaikan bahwa festival ini bertujuan untuk melestarikan budaya lokal sekaligus mempererat tali persaudaraan antarwarga.',
        author: 'Admin Desa',
        date: '2025-12-31',
        views: 425,
        image: '/images/berita-6.jpg'
      }
    ];

    const currentArtikel = allBerita.find(b => b.slug === slug);
    setArtikel(currentArtikel);
    
    // Ambil 5 berita lainnya (exclude artikel saat ini)
    const otherBerita = allBerita.filter(b => b.slug !== slug).slice(0, 5);
    setBeritaLainnya(otherBerita);

    // Increment views (in real app, this would be an API call)
    if (currentArtikel) {
      currentArtikel.views += 1;
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (!artikel) {
    return (
      <div className="container mx-auto mt-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Artikel tidak ditemukan.</p>
          <Link to="/berita" className="text-blue-500 hover:underline mt-4 inline-block">
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 flex flex-col md:flex-row gap-6 md:gap-8 px-4">
      {/* Bagian Kiri: Artikel Lengkap */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        {/* Navigasi Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center space-x-2">
          <Link to="/" className="hover:text-blue-500 flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
          /
          <Link to="/berita" className="hover:text-blue-500">Berita</Link> /
          <span className="text-gray-700">{artikel.title}</span>
        </div>

        {/* Judul Artikel */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6">
          {artikel.title}
        </h2>

        {/* Meta Informasi */}
        <div className="flex justify-between items-center mb-8 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v10l4 2"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span className="font-semibold">{formatDate(artikel.date)}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1 7 7 0 0 1 14 0Z"></path>
              </svg>
              <span className="font-semibold text-sm">{artikel.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"></path>
            </svg>
            <span className="text-sm">Dilihat {artikel.views.toLocaleString('id-ID')} kali</span>
          </div>
        </div>

        {/* Gambar Utama */}
        {artikel.image && (
          <div className="overflow-hidden rounded-lg mb-5 md:mb-6">
            <img 
              src={artikel.image} 
              alt={artikel.title}
              className="w-full h-48 sm:h-64 md:h-80 object-contain rounded-lg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Deskripsi Konten */}
        <p className="text-base sm:text-lg text-gray-800 mb-6 font-bold">
          {artikel.description}
        </p>

        {/* Isi Artikel */}
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{artikel.isi}</p>
        </div>
      </div>

      {/* Bagian Kanan: Berita Lainnya */}
      <div className="w-full md:w-1/3 lg:w-1/4 md:min-w-[260px] bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-black mb-6">Berita Lainnya</h3>
        <ul>
          {beritaLainnya.map((item) => (
            <li key={item.id} className="mb-5 sm:mb-6">
              <Link to={`/berita/${item.slug}`} className="flex items-center space-x-4 group">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
                  <i className="fas fa-image text-gray-400"></i>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-black mb-2 group-hover:text-blue-500 transition-colors duration-300 ease-out line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v10l4 2"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"></path>
                    </svg>
                    <span>{item.views.toLocaleString('id-ID')} views</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailBeritaPage;

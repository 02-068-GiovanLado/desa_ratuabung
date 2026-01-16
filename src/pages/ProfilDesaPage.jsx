const ProfilDesaPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* ====== VISI & MISI ====== */}
        <section className="bg-[#EAFBF1] py-12 px-4 md:px-20 lg:px-32">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">Visi</h2>
              <p className="text-gray-700">
                Terwujudnya Desa Data Adil, Makmur, Aman, dan Sehat, melalui Peningkatan Sumber Daya Manusia Pertanian yang Maju serta Berkualitas.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">Misi</h2>
              <ul className="text-gray-700 text-left list-inside list-disc inline-block">
                <li>Menyelenggarakan pemerintahan yang transparan, akuntabel, dan responsif.</li>
                <li>Meningkatkan sarana dan prasarana berbasis ekonomi produktif.</li>
                <li>Meningkatkan pembangunan infrastruktur yang mendukung perekonomian desa.</li>
                <li>Meningkatkan pelayanan kesehatan desa.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ====== BAGAN DESA ====== */}
        <section className="bg-white py-12 px-4 md:px-20 lg:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Struktur Organisasi Pemerintahan Desa</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <img 
                  src="/images/Bagan Desa_1.jpg" 
                  alt="Struktur Organisasi Pemerintahan Desa" 
                  className="rounded-xl shadow-lg w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-center text-gray-500 py-8 hidden">
                  <p>Struktur organisasi tidak tersedia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SEJARAH DAN KONDISI GEOGRAFIS ====== */}
        <section className="bg-[#EAFBF1] py-12 px-4 md:px-20 lg:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-green-700 mb-8">Sejarah dan Kondisi Geografis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <img 
                src="/images/profildesa.png" 
                alt="Sejarah Desa Bandar Rejo"
                className="rounded-xl shadow-md w-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <p className="text-gray-700 leading-relaxed text-justify">
                  Desa Bandar Rejo terbentuk melalui program transmigrasi yang membawa penduduk dari Pulau Jawa untuk membuka dan mengelola lahan baru di kawasan Natar. Sejak awal, kegiatan ekonomi desa didominasi oleh pertanian—khususnya padi, jagung, dan palawija—yang tetap menjadi mata pencaharian utama hingga saat ini. Secara geografis, desa memiliki luas sekitar 817 hektare dan terletak di wilayah dataran rendah yang cocok untuk pertanian. Administratif desa dibagi menjadi 7 dusun dan 19 RT. Jarak ke pusat Kecamatan Natar sekitar 22 km dan ke ibu kota Kabupaten Lampung Utara sekitar 90 km. Akses jalan menuju desa mendukung pergerakan komoditas pertanian ke pasar kecamatan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PETA LOKASI & BATAS DESA ====== */}
        <section className="bg-white py-12 px-4 md:px-20 lg:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Peta Lokasi Desa & Batas Desa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-sm text-gray-700">
                <h3 className="font-medium mb-3">Batas Desa</h3>
                <div className="flex justify-between">
                  <div>
                    <p><span className="font-medium">Utara</span>: Desa Serdang</p>
                    <p><span className="font-medium">Selatan</span>: Desa Natar</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Timur</span>: Desa Merak Batin</p>
                    <p><span className="font-medium">Barat</span>: Desa Branti</p>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />

                <p><span className="font-medium">Luas Desa:</span> 817 Ha</p>
                <hr className="my-4 border-gray-300" />
                <p><span className="font-medium">Jumlah Penduduk (BPS):</span> 3.154 Jiwa</p>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31786.158225657124!2d105.26312028848467!3d-5.220248346599821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c713ab488f55%3A0xf6dc504899f954ee!2sBandar%20Rejo%2C%20Kec.%20Natar%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761722726153!5m2!1sid!2sid" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Desa Bandarejo"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilDesaPage;

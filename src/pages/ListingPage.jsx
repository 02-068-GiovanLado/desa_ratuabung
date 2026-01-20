const ListingPage = () => {
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
            <span className="text-[#1E3A5F] font-medium">Peta Desa</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">Peta Desa Ratu Abung</h1>
          <p className="text-gray-600 text-base md:text-lg">Menampilkan peta lokasi dan point of interest Desa Ratu Abung</p>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="relative w-full h-[500px] md:h-[700px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31802.5545991708!2d104.924985187695!3d-4.886091925513833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e38aa06c5c5a66d%3A0xfead7bbc27eabfec!2sRatu%20Abung%2C%20Kec.%20Abung%20Sel.%2C%20Kabupaten%20Lampung%20Utara%2C%20Lampung!5e0!3m2!1sid!2sid!4v1768883630958!5m2!1sid!2sid"
                style={{ width: "100%", height: "100%", border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Ratu Abung"
              />
            </div>
          </div>

          {/* Map Information */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1E3A5F]">Lokasi Kantor Desa</h3>
              </div>
              <p className="text-sm text-gray-600">
                <a
                  href="https://maps.app.goo.gl/ifB6gqePz2PVxuHAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2E5C8A]"
                  >
                    Ratu Abung, Kec. Abung Selatan, Kab. Lampung Utara  
                    </a>
                    </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1E3A5F]">Luas Wilayah</h3>
              </div>
              <p className="text-sm text-gray-600">Total wilayah desa seluas 817 hektare</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1E3A5F]">Jumlah Penduduk</h3>
              </div>
              <p className="text-sm text-gray-600">Total penduduk 3,154 jiwa dengan 904 kepala keluarga</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListingPage;

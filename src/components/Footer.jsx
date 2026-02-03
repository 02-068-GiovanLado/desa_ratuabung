const Footer = () => {
  const currentYear = new Date().getFullYear();
  const alamat = "Ratu Abung, Kec. Abung Selatan, Kabupaten Lampung Utara, Lampung 35362, Indonesia";
  const telp = "085758620067";
  const email = "desaratuabungratuabung@gmail.com";

  return (
    <footer className="w-full bg-[#1E3A5F] text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Kotak border dashed */}
        <div className="rounded-md border border-dashed border-white/40 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Kolom 1: Logo + Info Desa */}
            <div className="flex items-start gap-3">
              <img 
                src="/images/Logo.png" 
                alt="Logo Desa"
                className="h-16 w-16 object-contain"
              />
              <div className="text-sm leading-relaxed">
                <div className="font-semibold mb-2 text-base">Pemerintah Desa Ratu Abung</div>
                <p className="text-white/90">{alamat}</p>
              </div>
            </div>

            {/* Kolom 2: Hubungi Kami */}
            <div>
              <h4 className="font-semibold mb-3 text-base">Hubungi Kami</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 5a2 2 0 012-2h1.28a1 1 0 01.95.684l1.13 3.39a1 1 0 01-.27 1.06l-1.2 1.2a16 16 0 006.36 6.36l1.2-1.2a1 1 0 011.06-.27l3.39 1.13a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z" />
                  </svg>
                  <span className="text-white/90">{telp}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="hover:underline text-white/90">{email}</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white/90">Kec. Abung Selatan, Lampung Utara</span>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Tautan Berguna */}
            <div>
              <h4 className="font-semibold mb-3 text-base">Tautan Berguna</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://kemendesa.go.id" target="_blank" rel="noopener noreferrer" 
                     className="hover:underline text-white/90 hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Kementerian Desa
                  </a>
                </li>
                <li>
                  <a href="https://www.kemendagri.go.id" target="_blank" rel="noopener noreferrer" 
                     className="hover:underline text-white/90 hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Kementerian Dalam Negeri
                  </a>
                </li>
                <li>
                  <a href="https://lampungutarakab.go.id" target="_blank" rel="noopener noreferrer" 
                     className="hover:underline text-white/90 hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Pemkab Lampung Utara
                  </a>
                </li>
                <li>
                  <a href="https://cekdptonline.kpu.go.id" target="_blank" rel="noopener noreferrer" 
                     className="hover:underline text-white/90 hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Cek DPT Online
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/80 text-sm mt-6">
          <p>&copy; {currentYear} Pemerintah Desa Ratu Abung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


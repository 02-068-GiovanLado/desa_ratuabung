const ListingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C7961] mb-2">
            PETA DESA
          </h1>
          <p className="text-sm md:text-base text-black/80 mb-6">
            Menampilkan Peta Desa Dengan <span className="italic">Interest Point</span> Desa Bandarejo
          </p>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="relative w-full h-[500px] md:h-[700px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31730.5!2d105.3!3d-5.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjQnMDAuMCJTIDEwNcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Bandarejo"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListingPage;

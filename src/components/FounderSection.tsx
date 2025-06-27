const FounderSection = () => {
  return <section className="container mx-auto px-6 py-16">
      <div className="bg-white sketch-card p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Expert Photo (Left Column) */}
        <div className="flex justify-center md:justify-end">
          <img src="https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_3dc1010f-3781-4957-8250-c936dadcbe04.jpeg" alt="Muhammad Adnan - Content Relay Founder" className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover sketch-card" />
        </div>
        
        {/* Expert Description (Right Column) */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet Your Automation Expert, Muhammad Adnan
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Muhammad Adnan is the founder of Content Relay, bringing years of expertise in automation  to help professionals scale their LinkedIn presence effortlessly.</p>
        </div>
      </div>
    </section>;
};
export default FounderSection;

const FounderSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-white sketch-card p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Expert Photo */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-1">
          <img 
            src="https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_3dc1010f-3781-4957-8250-c936dadcbe04.jpeg" 
            alt="Muhammad Adnan - Content Relay Founder" 
            className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover sketch-card" 
          />
        </div>
        
        {/* Expert Description */}
        <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Your Automation Expert, Muhammad Adnan
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Muhammad Adnan is the founder of Content Relay, bringing years of expertise in automation to help professionals scale their LinkedIn presence effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

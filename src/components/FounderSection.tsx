
const FounderSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="bg-white sketch-card p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Expert Photo */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <img 
              src="https://topmate-profile-pics.s3.ap-south-1.amazonaws.com/profile_pic_3dc1010f-3781-4957-8250-c936dadcbe04.jpeg" 
              alt="Muhammad Adnan - Content Relay Founder" 
              className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-2xl object-cover sketch-card" 
            />
          </div>
          
          {/* Expert Description */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
              Meet Your LinkedIn Automation Expert
            </h2>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-indigo-600 mb-2 sm:mb-3">
              Muhammad Adnan
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Founder of Content Relay, specializing in LinkedIn content automation workflows. Helping professionals scale their LinkedIn presence with AI-powered content systems delivered as a complete service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

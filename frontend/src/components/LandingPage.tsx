import React from 'react';

// --- Accurate SVG Icon Components Replicated from the Image ---

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-emerald-600">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const ShareDetailsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ReceiveReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ConsultDoctorIcon = () => (
  <div className="flex items-center justify-center -space-x-1 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  </div>
);

const LockIcon = () => (
  <div className="flex-shrink-0">
      <div className="relative">
          <div className="absolute inset-0 bg-yellow-400 rounded-lg transform -rotate-6"></div>
          <div className="relative bg-gray-800 rounded-lg p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
          </div>
      </div>
  </div>
);


// --- The Main Landing Page Component ---

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Hero Section --- */}
        <header className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Text & CTA */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <LogoIcon />
                <span className="text-xl font-semibold text-slate-800">Health Compass</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
                Your Personal Guide to Preventative Health
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0">
                Stop guessing. Get clear, personalized recommendations for medical tests and take a proactive step towards a healthier you.
              </p>
              <a href="#start" className="inline-block bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300">
                Start Your Health Journey
              </a>
            </div>

            {/* Right Column: Image Placeholder */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full h-80 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="text-white/80 text-lg font-medium">[Image Placeholder]</span>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* --- Three Steps Section --- */}
          <section className="py-16 md:py-24 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-16">
              Your Simple Journey in Three Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-200/90 rounded-2xl p-8 shadow-sm text-center">
                <ShareDetailsIcon />
                <h3 className="font-bold text-gray-800 mb-2">1. Share Your Details</h3>
                <p className="text-gray-500 leading-relaxed text-sm px-2">
                  Complete a confidential questionnaire in minutes. It's smart, dynamic, and respects your time.
                </p>
              </div>
              <div className="border border-gray-200/90 rounded-2xl p-8 shadow-sm text-center">
                <ReceiveReportIcon />
                <h3 className="font-bold text-gray-800 mb-2">2. Receive Your Report</h3>
                <p className="text-gray-500 leading-relaxed text-sm px-2">
                  Complex medical information is translated into personalized recommendations, explained in plain language.
                </p>
              </div>
              <div className="border border-gray-200/90 rounded-2xl p-8 shadow-sm text-center">
                <ConsultDoctorIcon />
                <h3 className="font-bold text-gray-800 mb-2">3. Consult Your Doctor</h3>
                <p className="text-gray-500 leading-relaxed text-sm px-2">
                  Take the results to a healthcare professional to create an informed and effective care plan.
                </p>
              </div>
            </div>
          </section>

          {/* --- "Built by Doctors" Section --- */}
          <section className="py-16 md:py-24 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-16">
              Built by Doctors, Designed for People
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="border border-gray-200/90 bg-white rounded-2xl p-8">
                <h3 className="font-bold text-gray-800 mb-2">Personalized Insights</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Get recommendations specifically tailored to your unique health profile, age, and family history.
                </p>
              </div>
              <div className="border border-gray-200/90 bg-white rounded-2xl p-8">
                <h3 className="font-bold text-gray-800 mb-2">Easy to Understand</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Complex medical info explained clearly, empowering you to take charge of your health with confidence.
                </p>
              </div>
              <div className="border border-gray-200/90 bg-white rounded-2xl p-8">
                <h3 className="font-bold text-gray-800 mb-2">Proactive Health</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Focus on prevention and early detection for better outcomes and long-term wellness.
                </p>
              </div>
            </div>
          </section>

          {/* --- "Private & Secure" Section --- */}
          <section className="pb-16 md:pb-24">
            <div className="bg-lime-50/70 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6">
              <LockIcon />
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h3 className="text-xl font-bold text-slate-800">Private & Secure, Always</h3>
                <p className="text-gray-600 mt-2 max-w-lg">
                  Your data is treated with the highest standards of privacy and security. It’s your health — you’re in control.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      {/* --- Footer --- */}
      <footer className="text-center py-8 border-t border-gray-200/80">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Health Compass. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
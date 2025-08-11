import React from 'react';
import { ArrowRight, Shield, FileText, BarChart3, Users, Lock, CheckCircle, Star, Activity } from 'lucide-react';

// --- Enhanced SVG Icon Components ---
const LogoIcon = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-[#4C7B4C] rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
    <div className="relative bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-xl p-3 shadow-lg">
      <Shield className="h-8 w-8 text-white" />
    </div>
  </div>
);

const ShareDetailsIcon = () => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
    <FileText className="h-10 w-10 text-blue-600" />
  </div>
);

const ReceiveReportIcon = () => (
  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl mb-6 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
    <BarChart3 className="h-10 w-10 text-purple-600" />
  </div>
);

const ConsultDoctorIcon = () => (
  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl mb-6 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
    <Users className="h-10 w-10 text-green-600" />
  </div>
);

const LockIcon = () => (
  <div className="flex-shrink-0">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-xl">
        <Lock className="h-8 w-8 text-yellow-400" />
      </div>
    </div>
  </div>
);

// --- The Enhanced Landing Page Component ---
const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#F5F9F5] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Hero Section --- */}
        <header className="py-16 md:py-24 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Text & CTA */}
            <div className="text-center lg:text-left space-y-8">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 group">
                <LogoIcon />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                  Health Compass
                </span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Your Personal Guide to{' '}
                  <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                    Preventative Health
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Stop guessing. Get clear, personalized recommendations for medical tests and take a proactive step towards a healthier you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#start" 
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>Start Your Health Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 10,000+ users</span>
                </div>
              </div>
            </div>

            {/* Right Column: Enhanced Visual */}
            <div className="relative">
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#4C7B4C]/20 to-transparent rounded-3xl blur-3xl"></div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                
                {/* Main visual container */}
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl backdrop-blur-lg border border-white/20">
                  <div className="aspect-square bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <Activity className="h-20 w-20 text-white/90" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
                  </div>
                  
                  {/* Floating cards */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Health Monitored</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">Personalized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* --- Three Steps Section --- */}
          <section className="py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Simple Journey in{' '}
                <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                  Three Steps
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A streamlined process designed to give you the most accurate health insights
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: <ShareDetailsIcon />,
                  title: "1. Share Your Details",
                  description: "Complete a confidential questionnaire in minutes. It's smart, dynamic, and respects your time."
                },
                {
                  icon: <ReceiveReportIcon />,
                  title: "2. Receive Your Report",
                  description: "Complex medical information is translated into personalized recommendations, explained in plain language."
                },
                {
                  icon: <ConsultDoctorIcon />,
                  title: "3. Consult Your Doctor",
                  description: "Take the results to a healthcare professional to create an informed and effective care plan."
                }
              ].map((step, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4C7B4C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex justify-center">{step.icon}</div>
                      <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Features Section --- */}
          <section className="py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built by{' '}
                <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                  Doctors
                </span>
                , Designed for People
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expert medical knowledge meets intuitive design for better health outcomes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  title: "Personalized Insights",
                  description: "Get recommendations specifically tailored to your unique health profile, age, and family history.",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  title: "Easy to Understand",
                  description: "Complex medical info explained clearly, empowering you to take charge of your health with confidence.",
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  title: "Proactive Health",
                  description: "Focus on prevention and early detection for better outcomes and long-term wellness.",
                  gradient: "from-green-500 to-green-600"
                }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 flex items-center justify-center`}>
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-800 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Privacy Section --- */}
          <section className="pb-20 md:pb-28">
            <div className="bg-gradient-to-r from-[#4C7B4C]/10 to-[#5a8a5a]/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <LockIcon />
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Private & Secure,{' '}
                    <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                      Always
                    </span>
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                    Your data is treated with the highest standards of privacy and security. 
                    It's your health — you're in complete control.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-[#4C7B4C]" />
                      <span>HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4 text-[#4C7B4C]" />
                      <span>256-bit Encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4C7B4C] rounded-lg transform rotate-3"></div>
                <div className="relative bg-[#4C7B4C] rounded-lg p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">Health Compass</span>
            </div>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Health Compass. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
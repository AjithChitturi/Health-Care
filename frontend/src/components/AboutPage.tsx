import React from 'react';
import { 
  Shield, 
  Heart, 
  Users, 
  Target, 
  Mail, 
  Award,
  Stethoscope,
  TrendingUp,
  CheckCircle,
  Globe,
  Clock,
  Lock
} from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}> = ({ icon, title, description, gradient }) => (
  <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <div className="relative">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4C7B4C] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const StatCard: React.FC<{
  number: string;
  label: string;
  description: string;
}> = ({ number, label, description }) => (
  <div className="text-center">
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-4xl font-bold bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="font-semibold text-gray-900 mb-2">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  </div>
);

const TeamMember: React.FC<{
  name: string;
  role: string;
  specialty: string;
}> = ({ name, role, specialty }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-16 h-16 bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-full flex items-center justify-center mx-auto mb-4">
      <Stethoscope className="h-8 w-8 text-white" />
    </div>
    <h4 className="text-lg font-bold text-gray-900 mb-1">{name}</h4>
    <p className="text-[#4C7B4C] font-semibold mb-2">{role}</p>
    <p className="text-sm text-gray-600">{specialty}</p>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="bg-[#F5F9F5] min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#4C7B4C] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-2xl p-4 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
                Health Compass
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              We are a passionate team of healthcare professionals, technologists, and designers dedicated to making preventive health accessible to everyone. Our mission is to empower individuals with the knowledge and tools to assess and manage their health risks proactively.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-[#4C7B4C]" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize preventive healthcare by providing personalized, evidence-based health risk assessments that empower individuals to make informed decisions about their health and well-being.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-[#4C7B4C]" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a healthier world by enabling early detection and personalized health guidance for all, regardless of geographic location or economic status.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Heart className="h-20 w-20 text-white/90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Evidence-Based</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Patient-Centered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Making a{' '}
            <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our impact in numbers - helping people take control of their health
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard
            number="10,000+"
            label="Users Served"
            description="Individuals empowered with health insights"
          />
          <StatCard
            number="95%"
            label="Satisfaction Rate"
            description="Users satisfied with their experience"
          />
          <StatCard
            number="24/7"
            label="Availability"
            description="Always accessible when you need it"
          />
          <StatCard
            number="50+"
            label="Health Conditions"
            description="Comprehensive risk assessments"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
              Health Compass
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combining medical expertise with cutting-edge technology for better health outcomes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Stethoscope className="h-7 w-7 text-white" />}
            title="Expert Medical Guidance"
            description="Our platform is built and reviewed by licensed healthcare professionals with years of clinical experience."
            gradient="from-blue-500 to-blue-600"
          />
          <FeatureCard
            icon={<Shield className="h-7 w-7 text-white" />}
            title="Personalized Assessments"
            description="Tailored health risk evaluations based on your unique profile, family history, and lifestyle factors."
            gradient="from-[#4C7B4C] to-[#5a8a5a]"
          />
          <FeatureCard
            icon={<TrendingUp className="h-7 w-7 text-white" />}
            title="Actionable Insights"
            description="Clear, easy-to-understand recommendations that you can discuss with your healthcare provider."
            gradient="from-purple-500 to-purple-600"
          />
          <FeatureCard
            icon={<Lock className="h-7 w-7 text-white" />}
            title="Privacy & Security"
            description="Your health data is encrypted and protected with the highest standards of security and compliance."
            gradient="from-red-500 to-red-600"
          />
          <FeatureCard
            icon={<Clock className="h-7 w-7 text-white" />}
            title="Quick & Convenient"
            description="Complete comprehensive health assessments in minutes, not hours, from the comfort of your home."
            gradient="from-orange-500 to-orange-600"
          />
          <FeatureCard
            icon={<Award className="h-7 w-7 text-white" />}
            title="Evidence-Based"
            description="All recommendations are based on the latest medical research and clinical guidelines."
            gradient="from-green-500 to-green-600"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Healthcare professionals and technology experts working together for your health
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember
            name="Dr. Sarah Johnson"
            role="Chief Medical Officer"
            specialty="Internal Medicine & Preventive Care"
          />
          <TeamMember
            name="Dr. Michael Chen"
            role="Senior Physician"
            specialty="Cardiology & Risk Assessment"
          />
          <TeamMember
            name="Dr. Emily Rodriguez"
            role="Medical Advisor"
            specialty="Family Medicine & Public Health"
          />
          <TeamMember
            name="Dr. James Wilson"
            role="Clinical Director"
            specialty="Endocrinology & Metabolism"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl"></div>
          <div className="relative text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 rounded-2xl p-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
              Have questions about our platform or need support? We're here to help you on your health journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:info@healthriskplatform.com"
                className="inline-flex items-center gap-3 bg-white text-[#4C7B4C] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="h-5 w-5" />
                info@healthriskplatform.com
              </a>
              
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Secure & Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 text-center">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Join thousands of people who have already started their preventive health journey with Health Compass.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/questionnaire"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <CheckCircle className="h-5 w-5" />
                Start Your Assessment
              </a>
              <a
                href="/login"
                className="inline-flex items-center gap-2 border-2 border-[#4C7B4C] text-[#4C7B4C] px-8 py-4 rounded-2xl font-semibold hover:bg-[#4C7B4C] hover:text-white transition-all duration-300"
              >
                <Users className="h-5 w-5" />
                Sign In
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default AboutPage;
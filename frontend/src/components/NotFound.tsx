import React from 'react';
import { Home, ArrowLeft, Search, Shield, HelpCircle } from 'lucide-react';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center px-4">
    <div className="max-w-2xl w-full text-center space-y-8">
      
      {/* Logo */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#4C7B4C] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
          <div className="relative bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-2xl p-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text text-transparent">
          Health Compass
        </span>
      </div>

      {/* 404 Visual */}
      <div className="relative">
        <div className="text-9xl md:text-[12rem] font-extrabold text-transparent bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] bg-clip-text leading-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
            <Search className="h-8 w-8 text-[#4C7B4C] mx-auto" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
          Oops! The page you're looking for seems to have taken a different health route. 
          Let's get you back on track.
        </p>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
        <div className="flex items-center justify-center gap-2 text-[#4C7B4C] mb-4">
          <HelpCircle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">What you can do:</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-[#F5F9F5] rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="h-4 w-4 text-blue-600" />
            </div>
            <p className="font-medium text-gray-700">Go back to homepage</p>
          </div>
          
          <div className="bg-[#F5F9F5] rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-4 w-4 text-purple-600" />
            </div>
            <p className="font-medium text-gray-700">Start health assessment</p>
          </div>
          
          <div className="bg-[#F5F9F5] rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="h-4 w-4 text-green-600" />
            </div>
            <p className="font-medium text-gray-700">Check URL spelling</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 border-2 border-[#4C7B4C] text-[#4C7B4C] px-6 py-3 rounded-xl font-semibold hover:bg-[#4C7B4C] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back
        </button>
        
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <Home className="h-5 w-5" />
          Go Home
        </a>
      </div>

      {/* Additional Help */}
      <div className="pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Still having trouble?{' '}
          <a 
            href="mailto:info@healthriskplatform.com" 
            className="text-[#4C7B4C] hover:text-[#5a8a5a] font-medium hover:underline transition-colors duration-300"
          >
            Contact our support team
          </a>
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </div>
  </div>
);

export default NotFound;
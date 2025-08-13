// src/components/Navbar.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  FileText, 
  Shield,
  Home,
  Info
} from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  userRole: 'patient' | 'admin' | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] p-2 rounded-xl shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">HealthCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Public Links */}
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-[#4C7B4C] text-white shadow-lg' 
                  : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'bg-[#4C7B4C] text-white shadow-lg' 
                  : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
              }`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>

            {/* Authenticated User Links */}
            {isLoggedIn ? (
              <>
                {userRole === 'patient' && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isActive('/dashboard') 
                          ? 'bg-[#4C7B4C] text-white shadow-lg' 
                          : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                      }`}
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/questionnaire"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isActive('/questionnaire') 
                          ? 'bg-[#4C7B4C] text-white shadow-lg' 
                          : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      Questionnaire
                    </Link>
                  </>
                )}

                {userRole === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive('/admin/dashboard') || location.pathname.startsWith('/admin/review')
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive('/login') 
                      ? 'bg-[#4C7B4C] text-white shadow-lg' 
                      : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#4C7B4C] focus:outline-none focus:text-[#4C7B4C] p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              {/* Public Links */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'bg-[#4C7B4C] text-white shadow-lg' 
                    : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                }`}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'bg-[#4C7B4C] text-white shadow-lg' 
                    : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                }`}
              >
                <Info className="h-5 w-5" />
                About
              </Link>

              {/* Authenticated User Links */}
              {isLoggedIn ? (
                <>
                  {userRole === 'patient' && (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          isActive('/dashboard') 
                            ? 'bg-[#4C7B4C] text-white shadow-lg' 
                            : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                        }`}
                      >
                        <User className="h-5 w-5" />
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/questionnaire"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          isActive('/questionnaire') 
                            ? 'bg-[#4C7B4C] text-white shadow-lg' 
                            : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                        }`}
                      >
                        <FileText className="h-5 w-5" />
                        Questionnaire
                      </Link>
                    </>
                  )}

                  {userRole === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                        isActive('/admin/dashboard') || location.pathname.startsWith('/admin/review')
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Shield className="h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  )}

                  {/* Role Indicator */}
                  <div className="px-3 py-2 text-sm text-gray-500 border-t border-gray-200 mt-2">
                    Logged in as: <span className="font-medium text-gray-700 capitalize">{userRole}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isActive('/login') 
                        ? 'bg-[#4C7B4C] text-white shadow-lg' 
                        : 'text-gray-700 hover:text-[#4C7B4C] hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    Login
                  </Link>
                  
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-2"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
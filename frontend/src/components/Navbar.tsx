import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Settings } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  userRole: 'patient' | 'admin' | null;
  username: string | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userRole, username, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4C7B4C] rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative bg-[#4C7B4C] rounded-lg p-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-gray-800 group-hover:text-[#4C7B4C] transition-colors duration-300">
                Health Risk Platform
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-[#4C7B4C] font-medium transition-colors duration-300 relative group"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#4C7B4C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-[#4C7B4C] font-medium transition-colors duration-300 relative group"
                >
                  Dashboard
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#4C7B4C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link 
                  to="/questionnaire" 
                  className="text-gray-600 hover:text-[#4C7B4C] font-medium transition-colors duration-300 relative group"
                >
                  Questionnaire
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#4C7B4C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                
                {userRole === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="flex items-center space-x-1 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-4 py-2 rounded-lg hover:from-[#5a8a5a] hover:to-[#4C7B4C] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-medium">Admin Tools</span>
                  </Link>
                )}

                <div className="flex items-center space-x-3">
                  {username && (
                    <span className="text-gray-700 font-medium">Hello, {username}</span>
                  )}
                  <div className="h-8 w-px bg-gray-300"></div>
                  <button 
                    onClick={onLogout}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-[#4C7B4C] font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-[#4C7B4C] text-white px-6 py-2 rounded-lg hover:bg-[#5a8a5a] transition-colors duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-[#4C7B4C] p-2 rounded-lg hover:bg-[#F5F9F5] transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-[#F5F9F5]">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-[#4C7B4C] font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              
              {isLoggedIn ? (
                <>
                  {username && (
                    <span className="text-gray-700 font-medium px-4 py-2">Hello, {username}</span>
                  )}
                  <Link 
                    to="/dashboard" 
                    className="text-gray-600 hover:text-[#4C7B4C] font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/questionnaire" 
                    className="text-gray-600 hover:text-[#4C7B4C] font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Questionnaire
                  </Link>
                  
                  {userRole === 'admin' && (
                    <Link 
                      to="/admin/dashboard" 
                      className="flex items-center space-x-2 bg-[#4C7B4C] text-white px-4 py-2 rounded-lg mx-2 hover:bg-[#5a8a5a] transition-colors duration-300"
                      onClick={toggleMobileMenu}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">Admin Tools</span>
                    </Link>
                  )}

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <button 
                      onClick={() => {
                        onLogout?.();
                        toggleMobileMenu();
                      }}
                      className="w-full text-left bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium mx-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-[#4C7B4C] font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-[#4C7B4C] text-white px-4 py-2 rounded-lg mx-2 hover:bg-[#5a8a5a] transition-colors duration-300 font-medium text-center"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
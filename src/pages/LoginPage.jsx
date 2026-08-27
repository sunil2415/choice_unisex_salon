import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';

// Using the images requested for decoration (Product Showcase)
import pinkBg from '../assets/images/pink-removebg.png';
import blueBg from '../assets/images/blue-removebg.png';
import greenBg from '../assets/images/green-removebg.png';

const themeConfigs = {
  pink: {
    primary: '#B55783',
    shadow: 'rgba(181,87,131,0.25)',
    hoverShadow: 'rgba(181,87,131,0.4)',
    ring: 'rgba(181,87,131,0.15)',
    borderFocus: 'rgba(181,87,131,0.4)',
  },
  blue: {
    primary: '#4A8B9D',
    shadow: 'rgba(74,139,157,0.25)',
    hoverShadow: 'rgba(74,139,157,0.4)',
    ring: 'rgba(74,139,157,0.15)',
    borderFocus: 'rgba(74,139,157,0.4)',
  },
  green: {
    primary: '#6B9D7A',
    shadow: 'rgba(107,157,122,0.25)',
    hoverShadow: 'rgba(107,157,122,0.4)',
    ring: 'rgba(107,157,122,0.15)',
    borderFocus: 'rgba(107,157,122,0.4)',
  }
};

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  // Theme state
  const [activeTheme, setActiveTheme] = useState('pink');
  const currentTheme = themeConfigs[activeTheme];

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password to continue.");
      return;
    }
    setError("");
    onLogin(email);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans bg-[#F7F4F2]">
      {/* CSS Animations & Dynamic Theme Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        
        /* Dynamic Theme Classes */
        .theme-form {
           box-shadow: 0 25px 60px -15px ${currentTheme.shadow};
        }
        .theme-input:focus {
           border-color: ${currentTheme.borderFocus};
           box-shadow: 0 0 0 4px ${currentTheme.ring} inset, 0 0 0 4px ${currentTheme.ring};
           background-color: white;
        }
        .theme-bg {
           background-color: ${currentTheme.primary};
        }
        .theme-text {
           color: ${currentTheme.primary};
        }
        .theme-hover-btn:hover {
           box-shadow: 0 10px 25px ${currentTheme.hoverShadow};
           transform: translateY(-2px);
        }
      `}</style>

      {/* 
        Big Leaves in the corners 
        Using high-quality leaf stock images with multiply blend mode to perfectly blend into the background
      */}
      <img 
        src="https://images.unsplash.com/photo-1596547613612-4ebf6bfb81f1?q=80&w=1200&auto=format&fit=crop" 
        alt="Top Left Leaf" 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] object-cover mix-blend-multiply opacity-50 pointer-events-none transform -rotate-12"
      />
      <img 
        src="https://images.unsplash.com/photo-1611078519412-32b004a500be?q=80&w=1200&auto=format&fit=crop" 
        alt="Bottom Right Leaf" 
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] object-cover mix-blend-multiply opacity-60 pointer-events-none transform rotate-12 scale-x-[-1]"
      />

      {/* Decorative Product Images Showcase */}
      <div className="absolute inset-0 z-0 flex items-center justify-between px-10 pointer-events-none">
        <img 
          src={blueBg} 
          alt="Blue Product" 
          onMouseEnter={() => setActiveTheme('blue')}
          onMouseLeave={() => setActiveTheme('pink')}
          className="w-auto h-[450px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] ml-10 cursor-pointer pointer-events-auto transition-transform hover:scale-110 duration-500"
          style={{ animation: 'float-delayed 7s ease-in-out infinite' }}
        />
        <img 
          src={pinkBg} 
          alt="Pink Product" 
          onMouseEnter={() => setActiveTheme('pink')}
          onMouseLeave={() => setActiveTheme('pink')}
          className="w-auto h-[450px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] mr-10 cursor-pointer pointer-events-auto transition-transform hover:scale-110 duration-500"
          style={{ animation: 'float-slow 6s ease-in-out infinite' }}
        />
      </div>

      {/* Floating Green Product for Extra Depth */}
      <img 
        src={greenBg} 
        alt="Green Product" 
        onMouseEnter={() => setActiveTheme('green')}
        onMouseLeave={() => setActiveTheme('pink')}
        className="absolute top-[10%] right-[30%] w-auto h-[300px] object-contain drop-shadow-2xl opacity-80 z-0 cursor-pointer pointer-events-auto transition-transform hover:scale-110 duration-500"
        style={{ animation: 'float-medium 8s ease-in-out infinite' }}
      />

      {/* Form Container */}
      <div className="w-full max-w-[440px] p-10 relative z-10 bg-white/95 backdrop-blur-xl rounded-[2.5rem] border-2 border-white theme-form transition-all duration-700 ease-in-out">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight flex items-center justify-center gap-2">
            Welcome Back! <span className="inline-block origin-bottom-right hover:animate-pulse">👋</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">Login to continue to your account</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-14 pr-4 py-4 bg-[#F9F9F9] border border-transparent rounded-2xl outline-none text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 shadow-inner theme-input"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-14 pr-12 py-4 bg-[#F9F9F9] border border-transparent rounded-2xl outline-none text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 shadow-inner theme-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50/80 border border-red-100 rounded-2xl animate-fade-in">
              <p className="text-xs font-semibold text-red-500 text-center">{error}</p>
            </div>
          )}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between pt-2 pb-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors duration-300 ${rememberMe ? 'theme-bg' : 'bg-gray-100 border border-gray-200 group-hover:bg-gray-200'}`}>
                {rememberMe && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <input type="checkbox" className="hidden" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span className="text-sm text-gray-600 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-sm theme-text font-semibold hover:underline transition-colors duration-300">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white text-[15px] transition-all duration-300 active:scale-[0.98] theme-bg theme-hover-btn"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-8 relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gray-200"></div>
          <span className="relative bg-white px-5 text-xs text-gray-400 font-bold uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Social Logins */}
        <div className="flex items-center justify-center gap-5">
          <button className="w-16 h-12 flex items-center justify-center bg-[#F9F9F9] border border-gray-100 rounded-2xl hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button className="w-16 h-12 flex items-center justify-center bg-[#F9F9F9] border border-gray-100 rounded-2xl hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 text-black">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
          </button>
          <button className="w-16 h-12 flex items-center justify-center bg-[#F9F9F9] border border-gray-100 rounded-2xl hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 text-[#1877F2]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>

        {/* Sign Up */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Don't have an account? <a href="#" className="theme-text hover:underline font-bold ml-1 transition-colors duration-300">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

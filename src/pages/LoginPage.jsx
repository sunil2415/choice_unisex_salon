import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@ecommuiux.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    onLogin(email);
  };

  const handleQuickFill = () => {
    setEmail("admin@ecommuiux.com");
    setPassword("password123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 font-sans bg-[#E6E8E6] text-[#2C342C] relative overflow-hidden">
      {/* Soft Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6A8E56]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2E4828]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Minimalist Glass Card */}
      <div className="w-full max-w-[420px] bg-[#E2E6E2]/95 backdrop-blur-2xl rounded-[32px] border border-white/80 shadow-2xl p-8 relative z-10 space-y-6">
        
        {/* Header with Logo */}
        <div className="text-center flex flex-col items-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#385433] flex items-center justify-center text-white shadow-lg shadow-emerald-950/20 mb-1">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-white/90 animate-ping absolute" />
              <span className="w-3 h-3 bg-white rounded-full relative" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">eCommUIUX</h1>
          <p className="text-xs text-gray-500 font-medium">Store Admin Dashboard Access</p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={submit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 tracking-wide uppercase">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ecommuiux.com"
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-black/10 rounded-2xl outline-none text-xs font-medium text-gray-900 focus:bg-white focus:border-[#385433] focus:ring-2 focus:ring-[#385433]/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 tracking-wide uppercase">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white/90 border border-black/10 rounded-2xl outline-none text-xs font-medium text-gray-900 focus:bg-white focus:border-[#385433] focus:ring-2 focus:ring-[#385433]/20 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-center">
              <p className="text-xs font-semibold text-rose-600">{error}</p>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 accent-[#385433] rounded cursor-pointer"
              />
              <span className="text-gray-600 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-[#385433] font-bold hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-white text-xs bg-[#385433] hover:bg-[#2E4828] transition-all shadow-md shadow-emerald-950/20 active:scale-[0.99] flex items-center justify-center gap-2 pt-3.5"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Footer */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#385433]" />
            <span>Secure Admin Portal</span>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[#385433] font-bold hover:underline"
          >
            Auto-fill Credentials
          </button>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;

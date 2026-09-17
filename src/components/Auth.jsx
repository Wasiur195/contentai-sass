import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  // Password validation criteria
  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordCriteria).every(Boolean);

  const validateForm = () => {
    const newErrors = {};

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && !isPasswordStrong) {
      newErrors.password = 'Password does not meet security requirements';
    }

    // Confirm Password (Only for Sign Up)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API authentication call
      onLoginSuccess({ email: formData.email });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/30 mb-3">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            ContentAI <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">Enterprise</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Sign in to access your dashboard' : 'Create an account to start generating copy'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => { setIsLogin(true); setErrors({}); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
              isLogin ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrors({}); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
              !isLogin ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className={`w-full bg-slate-900 border ${
                  errors.email ? 'border-red-500/80' : 'border-slate-800'
                } rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border ${
                  errors.password ? 'border-red-500/80' : 'border-slate-800'
                } rounded-xl pl-9 pr-10 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password}</p>}
          </div>

          {/* Password Rules Checklist (Only for Registration) */}
          {!isLogin && (
            <div className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-xl space-y-1.5 text-[11px]">
              <p className="text-slate-400 font-medium mb-1">Password requirements:</p>
              <div className="grid grid-cols-2 gap-1 text-slate-400">
                <span className={`flex items-center gap-1 ${passwordCriteria.minLength ? 'text-emerald-400' : ''}`}>
                  {passwordCriteria.minLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 text-slate-600" />}
                  At least 8 chars
                </span>
                <span className={`flex items-center gap-1 ${passwordCriteria.hasUpper ? 'text-emerald-400' : ''}`}>
                  {passwordCriteria.hasUpper ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 text-slate-600" />}
                  Uppercase letter
                </span>
                <span className={`flex items-center gap-1 ${passwordCriteria.hasLower ? 'text-emerald-400' : ''}`}>
                  {passwordCriteria.hasLower ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 text-slate-600" />}
                  Lowercase letter
                </span>
                <span className={`flex items-center gap-1 ${passwordCriteria.hasNumber ? 'text-emerald-400' : ''}`}>
                  {passwordCriteria.hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 text-slate-600" />}
                  Number
                </span>
                <span className={`flex items-center gap-1 col-span-2 ${passwordCriteria.hasSpecial ? 'text-emerald-400' : ''}`}>
                  {passwordCriteria.hasSpecial ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 text-slate-600" />}
                  Special symbol (!@#$%^&*)
                </span>
              </div>
            </div>
          )}

          {/* Confirm Password (Only for Registration) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full bg-slate-900 border ${
                    errors.confirmPassword ? 'border-red-500/80' : 'border-slate-800'
                  } rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-red-400 mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20 mt-2"
          >
            {isLogin ? 'Log In to Dashboard' : 'Create Enterprise Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
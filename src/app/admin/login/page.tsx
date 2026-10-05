'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  X,
  KeyRound,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { getApiBaseUrl } from '@/utils/config';

export default function AdminAuthPage() {
  const router = useRouter();

  // Auth Step State: 'CREDENTIALS' | 'OTP'
  const [step, setStep] = useState<'CREDENTIALS' | 'OTP'>('CREDENTIALS');

  // Form State (Step 1)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State (Step 2)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotFeedback, setForgotFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const res = await adminService.getMe();
        if (res.success && res.admin) {
          router.push('/admin/dashboard');
        }
      } catch (err) {
        // Not logged in
      }
    };
    checkExistingSession();
  }, [router]);

  // Resend Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Focus first OTP input on step change
  useEffect(() => {
    if (step === 'OTP') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  // Handle Step 1: Submit Credentials & Request OTP
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await adminService.login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.success) {
        setSuccessMsg(response.message || `OTP sent to ${email.trim().toLowerCase()}. Please check your email.`);
        setStep('OTP');
        setResendTimer(60);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid admin credentials or account not registered.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOtpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const otpString = otpDigits.join('').trim();
    if (otpString.length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP code.');
      return;
    }

    setLoading(true);

    try {
      const response = await adminService.verifyOtp({
        email: email.trim().toLowerCase(),
        otp: otpString,
      });

      if (response.success) {
        setSuccessMsg('Authentication successful! Redirecting to Executive Dashboard...');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Single OTP Digit Input Change
  const handleOtpDigitChange = (index: number, value: string) => {
    // Only accept single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Key Down on OTP Inputs (Backspace support)
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newDigits = ['', '', '', '', '', ''];
      digits.forEach((digit, i) => {
        if (i < 6) newDigits[i] = digit;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(digits.length, 5);
      otpInputRefs.current[nextIndex]?.focus();
    }
  };

  // Handle Resend OTP Request
  const handleResendOtp = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setResendLoading(true);

    try {
      const res = await adminService.resendOtp({ email: email.trim().toLowerCase() });
      if (res.success) {
        setSuccessMsg(res.message || 'A new 6-digit OTP code has been dispatched to your email.');
        setOtpDigits(['', '', '', '', '', '']);
        setResendTimer(60);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend OTP email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotFeedback(null);

    if (!forgotEmail.trim()) {
      setForgotFeedback({ msg: 'Please enter your registered admin email address.', type: 'error' });
      return;
    }

    setForgotLoading(true);

    try {
      const API_BASE_URL = getApiBaseUrl();
      const res = await fetch(`${API_BASE_URL}/artist/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase() }),
      });
      const data = await res.json();

      setForgotFeedback({
        msg: data.message || 'If an admin account exists for this email, password reset instructions have been dispatched.',
        type: 'success',
      });
    } catch (err: any) {
      setForgotFeedback({ msg: 'Failed to request password reset. Please try again later.', type: 'error' });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050816] text-slate-100 flex flex-col justify-center items-center px-4 py-12 overflow-hidden select-none font-sans">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Particle Orbs */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-1/4 w-3 h-3 bg-amber-400 rounded-full blur-[1px] shadow-[0_0_12px_#F5C518]"
      />
      <motion.div
        animate={{ y: [0, 22, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 right-1/4 w-4 h-4 bg-yellow-300 rounded-full blur-[2px] shadow-[0_0_15px_#E0B00F]"
      />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* MAYAD Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(245,197,24,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MAYAD Executive Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Admin <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Authentication</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {step === 'CREDENTIALS'
              ? 'Enter your admin credentials to initiate login.'
              : 'Enter the 6-digit OTP code dispatched to your email.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="relative rounded-2xl bg-[#0b0e1b]/85 border border-amber-500/20 p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden">
          {/* Top Gold Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

          {/* Error Banner */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Banner */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 1: CREDENTIALS FORM */}
          {step === 'CREDENTIALS' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {/* Email Address Box */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mayad.in"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Password Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password <span className="text-amber-400">*</span>
                  </label>
                  {/* Forgot Password Link */}
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setShowForgotModal(true);
                      setForgotFeedback(null);
                    }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-3.5 px-6 mt-2 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-[0_4px_25px_rgba(245,197,24,0.35)] hover:shadow-[0_6px_30px_rgba(245,197,24,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying & Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Security OTP</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION FORM */}
          {step === 'OTP' && (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Security OTP Sent</span>
                </div>
                <p className="text-xs text-slate-300">
                  Verification code dispatched to: <span className="font-bold text-amber-400">{email}</span>
                </p>
              </div>

              {/* 6-Digit OTP Inputs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 text-center mb-2.5">
                  Enter 6-Digit Verification Code
                </label>
                <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-11 h-13 text-center text-xl font-bold bg-slate-900 border border-slate-700/80 rounded-xl text-amber-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Timer & Action */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <span>Didn't receive code?</span>
                {resendTimer > 0 ? (
                  <span className="font-medium text-amber-400/80">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                    className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${resendLoading ? 'animate-spin' : ''}`} />
                    <span>{resendLoading ? 'Sending...' : 'Resend OTP'}</span>
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={loading || otpDigits.join('').length < 6}
                  className="group relative w-full py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-[0_4px_25px_rgba(245,197,24,0.35)] hover:shadow-[0_6px_30px_rgba(245,197,24,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Verifying OTP Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Sign In</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('CREDENTIALS');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Email & Password</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MAYAD OTT Platform Governance. All Rights Reserved.</p>
        </div>
      </motion.div>

      {/* =========================================================
          FORGOT PASSWORD MODAL
      ========================================================= */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#090d1f] border border-amber-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <HelpCircle className="w-5 h-5" />
                  <span>Reset Admin Password</span>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-4">
                Enter your registered admin email address below. We will dispatch password reset instructions to your inbox.
              </p>

              {forgotFeedback && (
                <div
                  className={`p-3 rounded-xl mb-4 text-xs ${
                    forgotFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {forgotFeedback.msg}
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="admin@mayad.in"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black text-xs font-bold hover:from-amber-300 hover:to-yellow-300 transition-colors disabled:opacity-50"
                  >
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getBackendUrl } from '@/utils/config';

const BACKEND_URL = getBackendUrl();

export default function ContactPage() {
  const { language } = useApp();
  const isHin = language === 'HIN';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'General',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg(
        isHin
          ? 'कृपया सभी आवश्यक फ़ील्ड भरें (नाम, ईमेल, विषय, संदेश)।'
          : 'Please fill in all required fields (Name, Email, Subject, Message).'
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const res = await fetch(`${BACKEND_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          category: 'General',
          message: '',
        });
      } else {
        setErrorMsg(
          data.message ||
          (isHin ? 'पूछताछ सबमिट करने में विफलता। कृपया पुनः प्रयास करें।' : 'Failed to submit inquiry. Please try again.')
        );
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMsg(
        isHin ? 'नेटवर्क त्रुटि। सर्वर से कनेक्ट करने में असमर्थ।' : 'Network error. Unable to connect to server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between overflow-x-hidden">
      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* HERO SECTION */}
        <div className="text-center relative mb-14">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-4 shadow-lg shadow-amber-500/10"
          >
            <Sparkles className="h-4 w-4" />
            {isHin ? 'मायड़ टीम से जुड़ें' : 'Connect With MAYAD Team'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white"
          >
            {isHin ? 'संपर्क एवं' : 'Contact'}{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              {isHin ? 'जानकारी' : '& Inquiries'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            {isHin
              ? 'फिल्म निर्माण, कास्टिंग कॉल, ब्रांड साझेदारी या सामान्य प्रतिक्रिया के बारे में कोई प्रश्न है? हमें पूछताछ भेजें और हमारी टीम तुरंत आपसे संपर्क करेगी।'
              : 'Have a question regarding movie productions, casting calls, brand partnerships, or general feedback? Send us an inquiry and our team will get back to you promptly.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: OFFICIAL CONTACT INFO CARD */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-[#090d1f]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <h2 className="text-xl font-extrabold text-white flex items-center gap-2.5 border-b border-white/10 pb-4">
                <Building className="h-5 w-5 text-amber-400" />
                <span>{isHin ? 'मायड़ प्रोडक्शन हाउस' : 'MAYAD Production House'}</span>
              </h2>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-amber-400/20 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-400 shadow-md">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{isHin ? 'ईमेल पता' : 'Email Address'}</h3>
                    <p className="mt-1 text-sm text-amber-300 font-semibold selection:bg-amber-400"> mayadstudio122@gmail.com</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{isHin ? 'त्वरित प्रतिक्रिया समय' : 'Fast Response'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {isHin
                      ? 'हमारी सहायता और प्रबंधन टीम सभी व्यावसायिक एवं सामान्य ईमेल पूछताछ का उत्तर 24 घंटे के भीतर देती है।'
                      : 'Our support & management team reviews all official and general inquiry emails within 24 hours.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: INQUIRY FORM */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-[#090d1f]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl"
            >
              <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2.5">
                <MessageSquare className="h-6 w-6 text-amber-400" />
                <span>{isHin ? 'संदेश / पूछताछ भेजें' : 'Send an Inquiry'}</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {isHin
                  ? 'नीचे दिया गया फॉर्म भरें और आपका संदेश सीधे मायड़ प्रबंधन को भेज दिया जाएगा।'
                  : 'Fill out the form below and your message will be forwarded directly to the MAYAD Management Console.'}
              </p>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-8 text-center space-y-4">
                  <CheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">
                    {isHin ? 'पूछताछ सबमिट हो गई!' : 'Inquiry Submitted!'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    {isHin
                      ? 'मायड़ से संपर्क करने के लिए धन्यवाद। आपका संदेश हमारे प्रशासनिक सिस्टम में दर्ज कर लिया गया है। हम शीघ्र ही आपसे संपर्क करेंगे।'
                      : 'Thank you for reaching out to MAYAD. Your message has been logged in our administrative system. We will contact you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-block rounded-xl bg-amber-400 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition cursor-pointer"
                  >
                    {isHin ? 'एक और पूछताछ भेजें' : 'Send Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="rounded-xl border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-300">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isHin ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isHin ? 'उदा. रमेश कुमार' : 'e.g. Ramesh Kumar'}
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isHin ? 'ईमेल पता *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isHin ? 'फ़ोन नंबर (वैकल्पिक)' : 'Phone Number (Optional)'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98290 00000"
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isHin ? 'पूछताछ श्रेणी' : 'Inquiry Category'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs font-bold text-white focus:border-amber-400 focus:outline-none transition-all"
                      >
                        <option value="General">{isHin ? 'सामान्य पूछताछ' : 'General Inquiry'}</option>
                        <option value="Production">{isHin ? 'फिल्म / वीडियो निर्माण' : 'Film / Video Production'}</option>
                        <option value="Casting">{isHin ? 'कास्टिंग और ऑडिशन' : 'Casting & Auditions'}</option>
                        <option value="Business">{isHin ? 'व्यापार साझेदारी' : 'Business Partnership'}</option>
                        <option value="Media">{isHin ? 'मीडिया और प्रेस' : 'Media & Press'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {isHin ? 'विषय *' : 'Subject *'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isHin ? 'उदा. आगामी राजस्थानी फिल्म के संबंध में पूछताछ' : 'e.g. Production Inquiry regarding upcoming film'}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {isHin ? 'विस्तृत संदेश *' : 'Detailed Message *'}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isHin ? 'यहाँ अपना विस्तृत संदेश लिखें...' : 'Write your inquiry message details here...'}
                      rows={5}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {loading
                      ? (isHin ? 'पूछताछ सबमिट हो रही है...' : 'Submitting Inquiry...')
                      : (isHin ? 'मायड़ प्रबंधन को पूछताछ सबमिट करें' : 'Submit Inquiry to MAYAD Admin')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

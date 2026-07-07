import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetLevel, setTargetLevel] = useState('B2 - Upper-Intermediate');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate direct secure server post
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Visual Backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-[-10%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Premium Contact Information */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block" id="contact-badge">
                CONCIERGE DESK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 leading-tight" id="contact-title">
                Connect with our Senior Advisors
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light" id="contact-subtitle">
                Have customized learning requirements, corporate group requests, or seeking specialized academic credit alignment? Drop us a line. Our elite language counselors review and respond to every request in hours.
              </p>

              {/* Direct Info List */}
              <div className="pt-4 space-y-6" id="contact-info-list">
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Direct Support</span>
                    <a href="mailto:concierge@skillfull.com" className="text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                      concierge@skillfull.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Academic Office Hours</span>
                    <a href="tel:+18005553022" className="text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                      +1 (800) 555-3022
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">San Francisco Headquarters</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      Suite 800, Linguistic Row, San Francisco, CA 94107
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Shield Info Card */}
            <div className="mt-8 p-4.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 shadow-md" id="contact-trust-pill">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900 font-semibold">Strict Privacy Assurance:</strong> Your contact information is never shared with third-party networks. Verified GDPR data isolation handles all student inquiries securely.
              </p>
            </div>
          </div>

          {/* Right Column: High-End Contact Inquiry Form */}
          <div className="lg:col-span-7" id="contact-form-container">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col justify-center backdrop-blur-sm">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                    id="contact-form-success"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-lg">
                      <CheckCircle2 className="w-7 h-7 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-black font-display text-slate-900">Inquiry Received Perfectly!</h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-light">
                      Thank you for contacting our concierge team. Senior academic counselors will contact you at your provided email address within 2-4 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-indigo-600/10"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-left"
                    id="contact-form-main"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="w-4 h-4 text-indigo-600" />
                      <span className="text-[10px] font-black uppercase text-slate-450 tracking-widest font-mono">
                        Direct Inquiry Channel
                      </span>
                    </div>

                    {/* Error Box */}
                    {errorMessage && (
                      <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Form Fields: Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Arthur Pendelton"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. arthur@domain.com"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Form Field: Target CEFR Level selector */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                        Target CEFR Fluency Goal
                      </label>
                      <select
                        value={targetLevel}
                        onChange={(e) => setTargetLevel(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-bold cursor-pointer"
                      >
                        <option value="A1 - Foundation Breakthrough">A1 - Foundation Breakthrough</option>
                        <option value="A2 - Essential Speaker">A2 - Essential Speaker</option>
                        <option value="B1 - Confident Communicator">B1 - Confident Communicator</option>
                        <option value="B2 - Upper-Intermediate">B2 - Upper-Intermediate</option>
                        <option value="C1 - Professional Master">C1 - Professional Master</option>
                        <option value="C2 - Native Prestige Mastery">C2 - Native Prestige Mastery</option>
                        <option value="I am unsure (Send Placement Quiz)">I am unsure (Send Placement Quiz)</option>
                      </select>
                    </div>

                    {/* Form Field: Message */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                        Your Message / Educational Ambitions *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your goals: career acceleration, native speech targets, corporate language requirements, etc..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-medium"
                      />
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin" />
                          Sending securely...
                        </>
                      ) : (
                        <>
                          <span>Submit Concierge Inquiry</span>
                          <Send className="w-4 h-4 text-indigo-300" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

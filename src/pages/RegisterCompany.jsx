import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerTenant } from '../redux/slices/tenantSlice';
import { message } from 'antd';

function EyeIcon({ open }) {
  return open ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

/* ── Input field ── */
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {required && <span className="text-[#05A5CB] mr-1">*</span>}
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
}

/* ── Benefit pill ── */
function Benefit({ icon, text }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-4 py-3">
      <span className="text-xl">{icon}</span>
      <span className="text-white/90 text-sm font-medium">{text}</span>
    </div>
  );
}

/* ── Main Page ── */
export default function RegisterCompany() {
  const [form, setForm] = useState({ username: '', email: '', password: '', company: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.ManageTenant);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!form.company.trim()) e.company = 'Company name is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});

    const result = await dispatch(registerTenant({
      name: form.username,
      email: form.email,
      password: form.password,
      // subDomain: form.company,
      companyName: form.company,

      // status: "inActive",
    }));

    if (registerTenant.fulfilled.match(result)) {
      message.success(`Welcome to NSPG, ${form.company}! Please verify your email to get started.`);
      setForm({ username: '', email: '', password: '', company: '' });
    } else {
      message.error(result.payload || 'Registration failed. Please try again.');
    }
  };

  const inputClass = (key) =>
    `w-full px-4 py-3.5 rounded-2xl border text-sm font-medium outline-none transition-all duration-200 bg-gray-50 focus:bg-white focus:shadow-md placeholder:text-gray-300 ${errors[key]
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#05A5CB] focus:ring-2 focus:ring-[#05A5CB]/15'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-[#05A5CB] to-[#024f62] flex-col justify-between p-16 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />

        {/* Top content */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-12">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Join 10,000+ Companies</span>
          </div>

          <h2 className="text-5xl font-black text-white leading-tight tracking-tight mb-6">
            Grow Your<br />Trade Business<br />
            <span className="text-white/60">Like Never Before</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Register your company and get instant access to the tools that help plumbers, electricians, and HVAC pros work smarter and earn more.
          </p>
        </div>

        {/* Benefits */}
        <div className="relative space-y-3">
          <Benefit icon="📊" text="Know your exact break-even instantly" />
          <Benefit icon="📋" text="Flat rate books that close more jobs" />
          <Benefit icon="💰" text="Average 34% profit increase in year one" />
          <Benefit icon="✅" text="100% satisfaction guarantee" />

          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-white/20">
            <div className="flex -space-x-2">
              {['R', 'M', 'S', 'F'].map((l, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xs font-bold">
                  {l}
                </div>
              ))}
            </div>
            <p className="text-white/70 text-sm">
              <span className="text-white font-bold">Trusted by pros</span> across the US, Canada & beyond
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">

          {submitted ? (
            
            <div className="text-center py-16" style={{ animation: 'fadeSlideUp 0.5s ease' }}>
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-4xl mx-auto mb-6">
                🎉
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">You're In!</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Welcome to NSPG, <span className="font-semibold text-gray-700">{form.company}</span>! Check your inbox to verify your email and get started.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ username: '', email: '', password: '', company: '' }); }}
                className="bg-[#05A5CB] text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-[#037a96] transition-colors duration-200 text-sm shadow-lg shadow-[#05A5CB]/20"
              >
                Register Another Company
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div style={{ animation: 'fadeSlideUp 0.5s ease' }}>
              {/* Mobile-only heading */}
              <div className="lg:hidden mb-8 text-center">
                <span className="inline-flex items-center gap-2 bg-[#05A5CB]/10 text-[#05A5CB] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#05A5CB] animate-pulse" />
                  Join 10,000+ Companies
                </span>
                <h1 className="text-3xl font-black text-gray-900">Grow Your Business</h1>
              </div>

              <h1 className="text-3xl font-black text-gray-900 mb-2">Register Your Company</h1>
              <p className="text-gray-400 text-sm mb-8">Fill in your details to get started. Takes less than a minute.</p>

              <div className="space-y-5">
                <Field label="User Name" error={errors.username}>
                  <input
                    type="text"
                    placeholder="e.g. admin.michael@nspgplus.com"
                    value={form.username}
                    onChange={set('username')}
                    className={inputClass('username')}
                  />
                </Field>

                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set('email')}
                    className={inputClass('email')}
                  />
                </Field>

                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={set('password')}
                      className={inputClass('password') + ' pr-12'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#05A5CB] transition-colors duration-200"
                    >
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                </Field>

                <Field label="Company" required error={errors.company}>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={set('company')}
                    className={inputClass('company')}
                  />
                </Field>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#05A5CB] hover:bg-[#037a96] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-base shadow-xl shadow-[#05A5CB]/25 hover:shadow-[#05A5CB]/40 hover:-translate-y-0.5 transition-all duration-200 mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Registering...
                    </span>
                  ) : 'Register →'}
                </button>
              </div>
              {/* Trust note */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
                {['🔒 Secure', '✅ No credit card needed', '🤝 Free to start'].map((t) => (
                  <span key={t} className="text-gray-400 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
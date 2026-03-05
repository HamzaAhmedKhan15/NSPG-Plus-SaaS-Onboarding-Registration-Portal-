import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Intersection observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Stat card ── */
function StatCard({ value, suffix, label, duration, trigger }) {
  const count = useCounter(value, duration, trigger);
  return (
    <div className="text-center">
      <div className="text-5xl font-black text-[#05A5CB] tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s, translate 0.3s` }}
    >
      {/* accent blob */}
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#05A5CB]/8 rounded-full group-hover:scale-150 transition-transform duration-700" />
      <div className="relative">
        <div className="w-14 h-14 bg-[#05A5CB]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#05A5CB]/20 transition-colors duration-300">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ── Testimonial card ── */
function TestimonialCard({ quote, name, company, location, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}
    >
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => <span key={i} className="text-[#05A5CB] text-lg">★</span>)}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#05A5CB] to-[#037a96] flex items-center justify-center text-white font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{name}</div>
          <div className="text-gray-400 text-xs">{company} · {location}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsRef, statsInView] = useInView(0.3);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const features = [
    { icon: '📊', title: 'Numbers Cruncher', desc: 'Instantly identify your true cost of doing business. Set profitable prices and replace complex spreadsheets with simple fill-in-the-blanks.', delay: 0 },
    { icon: '📋', title: 'Flat Rate Price Books', desc: 'The #1 flat rate solution for Plumbing, Electrical & HVAC. Give customers an upfront price that makes your sales easy.', delay: 100 },
    { icon: '📱', title: 'Web Apps', desc: 'Take your Flat Rate Price Guide anywhere. Available on every phone, tablet and computer — simple, fast, and always up to date.', delay: 200 },
    { icon: '✅', title: 'Inspection Forms', desc: 'Digital inspection forms for Plumbing, Electrical and HVAC. Streamline your workflow and look more professional on every job.', delay: 300 },
    { icon: '🎯', title: 'Custom Pricing', desc: 'Customize your price guide to reflect your exact market. Add tasks, change prices, colors, and categories anytime.', delay: 400 },
    { icon: '🌐', title: 'Multi-Platform', desc: 'Works on iOS, Android, Windows, and Mac. Your whole team stays in sync with one unified pricing system.', delay: 500 },
  ];

  const testimonials = [
    { quote: "Major change in our profits now. I would never have imagined the sheer joy of being so in control of my price.", name: "Rodney Koop", company: "Flat Rate Pricing Inc.", location: "Milwaukee, WI", delay: 0 },
    { quote: "My profits increased and my business became easier to manage. The software paid for itself in less than four weeks.", name: "Mel Carr", company: "Mel Carr Electric Corp.", location: "Albany, NY", delay: 150 },
    { quote: "By far the best pricing tool we have used. It makes our business more user friendly with very little training.", name: "George Raspino Jr.", company: "Stuart Services", location: "Metairie, LA", delay: 300 },
  ];

  return (
    <div className="bg-gray-50 font-sans">

      {/* ══ HERO ══ */}
      <section className="relative bg-white overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#05A5CB 1px, transparent 1px), linear-gradient(90deg, #05A5CB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Gradient orb */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-gradient-radial from-[#05A5CB]/15 to-transparent rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 bg-[#05A5CB]/10 border border-[#05A5CB]/20 rounded-full px-4 py-2 mb-8"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0s' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#05A5CB] animate-pulse" />
                <span className="text-[#05A5CB] text-sm font-semibold tracking-wide">Trusted since 1992</span>
              </div>
              <h1
                className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.1s' }}
              >
                Run a More{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#05A5CB]">Profitable</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 9 Q75 2 150 8 Q225 14 298 5" stroke="#05A5CB" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </span>{' '}
                Trade Business
              </h1>

              <p
                className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}
              >
                NSPG gives Plumbing, Electrical & HVAC companies the tools to know their costs, set the right prices, and close more jobs — without the guesswork.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.3s' }}
              >
                <Link to="/subscription"
                  className="inline-flex items-center gap-2 bg-[#05A5CB] hover:bg-[#037a96] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#05A5CB]/25 hover:shadow-[#05A5CB]/40 hover:-translate-y-0.5 transition-all duration-200 text-sm">
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                
              </div>

              {/* Trust badges */}
              <div
                className="flex items-center gap-6 mt-12 pt-8 border-t border-gray-100"
                style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.7s ease 0.5s' }}
              >
                {['DSC Preferred Vendor', 'Nexstar Partner', '100% Satisfaction'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span className="text-[#05A5CB]">✓</span> {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div
              className="relative"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.8s ease 0.3s' }}
            >
              <div className="relative bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-gray-700 rounded-lg px-3 py-1 text-xs text-gray-400">nspg.com/dashboard</div>
                </div>
                {/* Mock dashboard content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[{ label: 'Profit Margin', val: '34%', up: true }, { label: 'Jobs This Month', val: '127', up: true }, { label: 'Avg. Job Value', val: '$485', up: false }].map(({ label, val, up }) => (
                      <div key={label} className="bg-gray-700/60 rounded-2xl p-4">
                        <div className="text-xs text-gray-400 mb-1">{label}</div>
                        <div className="text-xl font-black text-white">{val}</div>
                        <div className={`text-xs mt-1 font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>{up ? '↑ +12%' : '↓ -3%'}</div>
                      </div>
                    ))}
                  </div>
                  {/* Fake chart */}
                  <div className="bg-gray-700/40 rounded-2xl p-5">
                    <div className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-widest">Revenue vs. Cost</div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 110].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                          <div className="w-full bg-[#05A5CB] rounded-sm opacity-90" style={{ height: `${h * 0.85}%` }} />
                          <div className="w-full bg-gray-600 rounded-sm" style={{ height: `${h * 0.45}%` }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-3">
                      <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-[#05A5CB]" />Revenue</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-gray-600" />Cost</span>
                    </div>
                  </div>
                  {/* Price book preview */}
                  <div className="bg-gray-700/40 rounded-2xl p-4">
                    <div className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest">Recent Price Entries</div>
                    {[{ code: 'PK016', name: 'Kitchen Faucet Pull-Out', price: '$417' }, { code: 'PK011', name: 'Kitchen Faucet Single Handle', price: '$481' }, { code: 'PK012', name: 'Bath Faucet Installation', price: '$312' }].map(({ code, name, price }) => (
                      <div key={code} className="flex items-center justify-between py-2 border-b border-gray-600/50 last:border-0">
                        <div>
                          <span className="text-xs font-bold text-[#05A5CB]">{code}</span>
                          <span className="text-xs text-gray-300 ml-2">{name}</span>
                        </div>
                        <span className="text-xs font-bold text-white">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 text-lg">💰</div>
                <div>
                  <div className="text-xs text-gray-400">Average profit increase</div>
                  <div className="text-lg font-black text-gray-900">+34%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <StatCard value={30} suffix="+" label="Years in Business" duration={1500} trigger={statsInView} />
            <StatCard value={10000} suffix="+" label="Companies Served" duration={2000} trigger={statsInView} />
            <StatCard value={4} suffix="" label="Countries" duration={1000} trigger={statsInView} />
            <StatCard value={100} suffix="%" label="Satisfaction Guarantee" duration={1800} trigger={statsInView} />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#05A5CB] text-sm font-bold uppercase tracking-widest">Everything You Need</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-3 mb-5 tracking-tight">Tools Built for the Trades</h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">From knowing your break-even to closing jobs at the right price — NSPG has every tool your business needs to grow.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-20 bg-linear-to-r from-[#05A5CB] to-[#037a96] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">100% Satisfaction Guarantee</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Not happy with any NSPG software package? We work with you until it meets your business needs — no questions asked.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/subscription" className="bg-white text-[#05A5CB] font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm">
              View Subscription Plans
            </Link>
            <Link to="/register-company" className="bg-white/15 backdrop-blur border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200 text-sm">
              Register Your Company
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#05A5CB] text-sm font-bold uppercase tracking-widest">Real Results</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-3 tracking-tight">Trusted by Trade Pros</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRY PARTNERS ══ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-10">Industry Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['DSC Preferred Vendor', 'Nexstar Network', 'Preferred Plumbing Solutions'].map((p) => (
              <div key={p} className="text-gray-300 font-bold text-lg tracking-tight hover:text-[#05A5CB] transition-colors duration-200 cursor-default">{p}</div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
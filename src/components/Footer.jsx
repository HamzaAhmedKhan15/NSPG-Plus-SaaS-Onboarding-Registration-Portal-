import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NSPGLogo from '@/assets/logo/nspgLogo.png';

/* ── helpers ── */
function FooterLink({ to, children,...props }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
        {...props}
      >
        <span className="w-1 h-1 rounded-full bg-[#05A5CB] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {children}
      </Link>
    </li>
  );
}

function ContactRow({ icon, href, children }) {
  const Tag = href ? 'a' : 'span';
  return (
    <li>
      <Tag
        href={href}
        className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors duration-200 group"
      >
        <span className="mt-0.5 w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-[#05A5CB]/20 transition-colors duration-200 text-[#05A5CB]">
          {icon}
        </span>
        <span className="leading-relaxed">{children}</span>
      </Tag>
    </li>
  );
}

/* ── Newsletter input ── */
function NewsletterInput() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) return;
    setSent(true);
  };

  return sent ? (
    <div className="flex items-center gap-2 text-[#05A5CB] text-sm font-semibold">
      <span className="w-5 h-5 rounded-full bg-[#05A5CB]/15 flex items-center justify-center text-xs">✓</span>
      You're subscribed!
    </div>
  ) : (
    <div className="flex gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#05A5CB]/60 focus:ring-2 focus:ring-[#05A5CB]/15 transition-all duration-200"
      />
      <button
        onClick={handleSubmit}
        className="shrink-0 bg-[#05A5CB] hover:bg-[#04c0eb] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
      >
        Subscribe
      </button>
    </div>
  );
}

/* ── Main Footer ── */
export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#037a96] to-[#012f3d] text-gray-300">
      {/* Subtle background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#05A5CB]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#05A5CB]/5 blur-3xl pointer-events-none" />

      {/* ── Top accent line ── */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#05A5CB]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* ── Main 4-col grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Col 1 — Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={NSPGLogo} alt="NSPG Logo" className="h-10 object-contain mb-5 brightness-200" />
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Business tools for Plumbing, Electrical & HVAC professionals. Know your costs. Price right. Profit more.
            </p>


          </div>

          {/* Col 2 — Contact ── */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#05A5CB]" />
              Contact
            </h4>
            <ul className="space-y-3.5">
              <ContactRow
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                NSPG, Inc.<br />PO Box 1168<br />Manahawkin, NJ 08050
              </ContactRow>

              <ContactRow
                href="tel:2017675520"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                201-767-5520
              </ContactRow>

              <ContactRow
                href="mailto:info@nspgweb.com"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                info@nspgweb.com
              </ContactRow>
            </ul>
          </div>

          {/* Col 3 — Products ── */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#05A5CB]" />
              Products
            </h4>

            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#05A5CB] text-xs">🖥</span>
                  <span className="text-white/80 text-xs font-bold uppercase tracking-wide">Desktop</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">Runs on Microsoft Windows only.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#05A5CB] text-xs">📱</span>
                  <span className="text-white/80 text-xs font-bold uppercase tracking-wide">Web Apps</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">All phones, tablets & computers.</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              <FooterLink to="/subscription"  onClick={() => window.scrollTo(0, 0)}>Subscription Plans</FooterLink>
              <FooterLink to="/register-company"  onClick={() => window.scrollTo(0, 0)}>Register Company</FooterLink>
            </ul>
          </div>

          {/* Col 4 — Newsletter ── */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#05A5CB]" />
              Newsletter
            </h4>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              Get tips on pricing, profit, and growing your trade business — delivered to your inbox.
            </p>



            <Link
              to="/register-company"
               onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 hover:underline text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors duration-200 group"
            >
              Subscribe to Newsletter
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* About badges */}
            <div className="mt-8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Serving the trades</p>
              <div className="flex flex-wrap gap-2">
                {['Plumbing', 'Electrical', 'HVAC'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#05A5CB]/10 border border-[#05A5CB]/20 text-[#05A5CB] text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} NSPG, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {[
              { to: '/terms', label: 'Terms of Service' },
              { to: '/privacy', label: 'Privacy' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import fetchMySubscription from '../redux/slices/tenantSlice'
export default function SubscriptionCard({
  name,
  price,
  period,
  description,
  highlighted = [],
  features = [],
  isCurrent = false,
  isPopular = false,
  onSelect,
  onCancel,
  delay = 0,
}) {

  

  return (
    <div
      className={`
        relative flex flex-col h-full rounded-3xl p-8 transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl
        ${isCurrent
          ? 'bg-linear-to-br from-[#05A5CB] to-[#037a96] shadow-xl shadow-[#05A5CB]/30 ring-4 ring-[#05A5CB]/40'
          : 'bg-white shadow-md border border-gray-100 hover:border-[#05A5CB]/30'}
        ${isPopular && !isCurrent ? 'ring-2 ring-[#05A5CB]/50' : ''}
      `}
      style={{
        opacity: 0,
        animation: 'fadeSlideUp 0.6s ease forwards',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* ── Top badge ── */}
      {isCurrent && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#05A5CB] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
          Current Plan
        </span>
      )}
      {isPopular && !isCurrent && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#05A5CB] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
          Most Popular
        </span>
      )}

      {/* ── Name ── */}
      <h3 className={`text-2xl font-black tracking-tight ${isCurrent ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>

      {/* ── Description ── */}
      {description && (
        <p className={`text-xs leading-relaxed mt-1.5 ${isCurrent ? 'text-white/60' : 'text-gray-400'}`}>
          {description}
        </p>
      )}

      {/* ── Price ── */}
      <div className="flex items-baseline mt-4">
        <span className={`text-5xl font-black tracking-tighter ${isCurrent ? 'text-white' : 'text-gray-900'}`}>
          {price}
        </span>
        <span className={`text-sm ml-1 ${isCurrent ? 'text-white/70' : 'text-gray-400'}`}>
          {period === 'one_time' ? 'one‑time' : period}
        </span>
      </div>

      {/* ── Trial badge ── */}
      {/* {trialDays > 0 && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-3 w-fit
          ${isCurrent ? 'bg-white/20 text-white' : 'bg-[#05A5CB]/10 text-[#05A5CB]'}`}>
          🎁 {trialDays}-day free trial
        </div>
      )} */}

      {/* ── Divider ── */}
      <div className={`h-px w-full my-5 ${isCurrent ? 'bg-white/20' : 'bg-gray-100'}`} />

      {/* ── Includes label ── */}
      <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isCurrent ? 'text-white/60' : 'text-gray-400'}`}>
        Includes
      </p>

      {/* ── Product pills — solid teal bg, white text ── */}
      {highlighted.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {highlighted.map((h) => (
            <span
              key={h}
              className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
                ${isCurrent
                  ? 'bg-white/25 text-white'           // on teal card → white pill
                  : 'bg-[#05A5CB] text-white'}          // on white card → solid teal pill
              `}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* ── Feature checkmarks ── */}
      <ul className="flex-1 space-y-2.5 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
              ${isCurrent ? 'bg-white/20 text-white' : 'bg-[#05A5CB]/10 text-[#05A5CB]'}`}>
              ✓
            </span>
            <span className={`text-sm font-medium ${isCurrent ? 'text-white/90' : 'text-gray-600'}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* ── CTA pinned to bottom ── */}
      <div className="mt-auto space-y-3">
        {isCurrent ? (
          <>
            <button disabled className="w-full py-3.5 rounded-2xl bg-white/20 text-white font-bold text-sm cursor-default">
              Active Plan
            </button>
            <button
              onClick={onCancel}
              className="w-full py-2.5 rounded-2xl border border-white/30 text-white/70 hover:text-white hover:border-white/60 text-xs font-semibold transition-colors duration-200"
            >
              Cancel Subscription
            </button>
          </>
        ) : (
          <button
            onClick={onSelect}
            className="w-full py-3.5 cursor-pointer rounded-2xl bg-[#05A5CB] hover:bg-[#037a96] text-white font-bold text-sm shadow-lg shadow-[#05A5CB]/20 hover:shadow-[#05A5CB]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Purchase this plan
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
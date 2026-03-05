
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicSubscriptionPlans } from '../redux/slices/tenantSlice';
import SubscriptionCard from '../components/SubscriptionCard';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


// function CtaBanner() {
//   return (
//     <div className="relative overflow-hidden bg-linear-to-r from-gray-900 via-[#037a96] to-[#05A5CB] py-4 px-6">
//       <div
//         className="absolute inset-0 opacity-20 pointer-events-none"
//         style={{
//           background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
//           animation: 'shimmer 3s infinite linear',
//           backgroundSize: '200% 100%',
//         }}
//       />
//       <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">⚡</span>
//           <p className="text-white font-bold text-sm sm:text-base">
//             Limited Time — Save up to{' '}
//             <span className="text-yellow-300 underline underline-offset-2">40% on annual plans</span>.
//             Offer ends soon!
//           </p>
//         </div>
//         <a href="#plans" className="shrink-0 bg-white text-[#05A5CB] text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-200 shadow-md">
//           Grab the Deal →
//         </a>
//       </div>
//       <style>{`@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`}</style>
//     </div>
//   );
// }


export default function Subscription() {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { list: plans = [], loading, error } = useSelector(
    (state) => state.ManageTenant?.plans || { list: [], loading: false, error: null }
  );

  // const {fetchSubsId} = useSelector((state)=>state.ManageTenant)

  // console.log(fetchSubsId,'sdsdsdsdsdsdsddsd')
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    dispatch(fetchPublicSubscriptionPlans());
    // dispatch(fetchMySubscription())
  }, [dispatch]);


  const handleSelectClick =()=>{
    message.success('Please register your company first to get started.');
    navigate('/register-company')
     window.scrollTo(0, 0);
  }

  /* ── Transform API → UI ── */
  const displayPlans = [...plans]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((plan) => {
      // Billing period
      let period = '/month';
      if (plan.billingInterval === 'year')     period = '/year';
      if (plan.billingInterval === 'one_time') period = 'one_time';

      // Formatted price
      const priceFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(plan.price));

      // ✅ products[] → pill badges  "NUMBER_CRUNCHER" → "Number Cruncher"
      const highlighted = (plan.products || []).map((p) =>
        p.value
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      );

      // ✅ features[] → checkmark list  keeps "NC"/"PG" as-is, capitalises sentences
      const features = (plan.features || []).map((f) =>
        f === f.toUpperCase() ? f : f.charAt(0).toUpperCase() + f.slice(1)
      );

      return {
        id:          plan.id,
        name:        plan.name,
        description: plan.description || '',
        price:       priceFormatted,
        period,
        features,
        highlighted,
        trialDays:   plan.trialDays || 0,
        isPopular:   plan.sortOrder === 2,
        isCurrent:   plan.id === currentPlanId,
      };
    });
  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-[#05A5CB] animate-spin mx-auto mb-6" />
          <p className="text-gray-600 font-medium">Loading available plans...</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-5">⚠️</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Failed to load plans</h2>
          <p className="text-gray-500 text-sm mb-8">{error}</p>
          <button
            onClick={() => dispatch(fetchPublicSubscriptionPlans())}
            className="bg-[#05A5CB] hover:bg-[#037a96] text-white font-bold px-8 py-3.5 rounded-2xl transition-colors duration-200 shadow-lg shadow-[#05A5CB]/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <CtaBanner /> */}

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 text-center">
        <span className="inline-block text-[#05A5CB] text-xs font-black uppercase tracking-widest bg-[#05A5CB]/10 px-4 py-2 rounded-full mb-4">
          Flexible Pricing
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Choose Your Subscription Plan
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
          All plans include a <span className="font-semibold text-gray-700">100% satisfaction guarantee</span>. Not happy? We will work with you until it is right.
        </p>

       
      </div>

      {/* Plans grid */}
      <div id="plans" className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {displayPlans.map((plan, index) => (
            <SubscriptionCard
              key={plan.id}
              {...plan}
              onSelect={() => handleSelectClick()}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: '🔒', title: 'Secure Payments', desc: 'All transactions are encrypted and secure.' },
            { icon: '↩️', title: 'Cancel Anytime',  desc: 'No lock-in contracts. Cancel with one click.' },
            { icon: '🤝', title: '100% Guarantee',  desc: 'Not satisfied? We will make it right, guaranteed.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-2">
              <span className="text-3xl">{icon}</span>
              <p className="font-bold text-gray-900 text-sm">{title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
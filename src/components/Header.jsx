// import React from 'react';
// import { NavLink } from 'react-router-dom';

// import NSPGLogo from '@/assets/logo/nspgLogo.png';

// function Header() {
//   const activeClass = "text-[#05A5CB] font-semibold border-b-2 border-[#05A5CB]";
//   const inactiveClass = "text-gray-700 hover:text-[#05A5CB] transition-colors";

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20">

//             <img
//                 src={NSPGLogo}
//                 alt="NSPG Logo"
//                 className="w-30 h-12 "
//             />
      

//           {/* Navigation – Desktop */}
//           <nav className="hidden md:flex items-center gap-8">
//             <NavLink
//               to="/"
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//                onClick={() => window.scrollTo(0, 0)}
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/subscription"
//                onClick={() => window.scrollTo(0, 0)}
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               Subscription
//             </NavLink>

//             <NavLink
//               to="/register-company"
//                onClick={() => window.scrollTo(0, 0)}
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               Register Company
//             </NavLink>
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button className="text-gray-700 hover:text-[#05A5CB] focus:outline-none">
//               <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>

//         </div> 
//       </div>   
//     </header>  
//   );
// }

// export default Header;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NSPGLogo from '@/assets/logo/nspgLogo.png';

const LINKS = [
  { to: '/',                label: 'Home' },
  { to: '/subscription',    label: 'Subscription' },
  { to: '/register-company',label: 'Register Company' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClass   = "text-[#05A5CB] font-semibold border-b-2 border-[#05A5CB]";
  const inactiveClass = "text-gray-700 hover:text-[#05A5CB] transition-colors";

  const mobileActiveClass   = "block px-4 py-3 text-[#05A5CB] font-semibold bg-[#05A5CB]/5 rounded-xl border-l-4 border-[#05A5CB]";
  const mobileInactiveClass = "block px-4 py-3 text-gray-700 hover:text-[#05A5CB] hover:bg-gray-50 rounded-xl transition-colors";

  const closeMenu = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <img src={NSPGLogo} alt="NSPG Logo" className="w-30 h-12 object-contain" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger / close button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#05A5CB] focus:outline-none transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              /* X icon */
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) => isActive ? mobileActiveClass : mobileInactiveClass}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
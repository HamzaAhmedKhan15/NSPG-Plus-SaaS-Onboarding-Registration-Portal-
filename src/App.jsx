/** @format */

// import { Routes, Route } from 'react-router-dom';
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// // Import your pages
// import Home from './pages/Home.jsx';
// import Subscription from './pages/Subscription';
// import RegisterCompany from './pages/RegisterCompany';

// function App() {
//   return (
//     <>
//     <div className='min-h-screen flex flex-col'>
//       <Header />
//       <main className="grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/subscription" element={<Subscription />} />
//           <Route path="/register-company" element={<RegisterCompany />} />
//         </Routes>
//       </main>
//       <Footer />
//       </div>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from './pages/Home.jsx';
// import Subscription from './pages/Subscription';
// import RegisterCompany from './pages/RegisterCompany';

const ComingSoon = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          top: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, rgba(5,165,203,0.12) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          bottom: "-80px",
          left: "-80px",
          background: "radial-gradient(circle, rgba(5,165,203,0.08) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite reverse",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(5,165,203,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,165,203,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1, padding: "2rem" }}>
        {/* Eyebrow */}
        <p
          style={{
            letterSpacing: "0.4em",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            color: "#05a5cb",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {/* ◈ &nbsp; Under Construction &nbsp; ◈ */}
        </p>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: "700",
            color: "#0a0a0a",
            lineHeight: 1.05,
            margin: "0 0 0.3rem",
            letterSpacing: "-0.03em",
          }}
        >
          Coming
        </h1>
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: "700",
            fontStyle: "italic",
            color: "#05a5cb",
            lineHeight: 1.05,
            margin: "0 0 2.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          Soon!
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #05a5cb, transparent)",
            margin: "0 auto 2.5rem",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            color: "#444444",
            fontSize: "1.05rem",
            maxWidth: "380px",
            margin: "0 auto 3rem",
            lineHeight: 1.8,
            fontWeight: 400,
          }}
        >
          We're putting the finishing touches on something great. Check back soon.
        </p>

        {/* Bouncing dots */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#05a5cb",
                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="*" element={<ComingSoon />} />
      {/* Uncomment below when going live */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/subscription" element={<Subscription />} /> */}
      {/* <Route path="/register-company" element={<RegisterCompany />} /> */}
    </Routes>

    // Restore wrapper when going live:
    // <div className='min-h-screen flex flex-col'>
    //   <Header />
    //   <main className="grow"><Routes>...</Routes></main>
    //   <Footer />
    // </div>
  );
}

export default App;

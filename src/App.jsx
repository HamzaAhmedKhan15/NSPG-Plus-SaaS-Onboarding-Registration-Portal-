import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import your pages
import Home from './pages/Home.jsx';
import Subscription from './pages/Subscription';
import RegisterCompany from './pages/RegisterCompany';

function App() {
  return (
    <>
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/register-company" element={<RegisterCompany />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </>
  );
}

export default App;
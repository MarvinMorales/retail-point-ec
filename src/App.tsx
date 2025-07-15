import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './utils/ScrollToTop';
import CategoriesPage from './pages/CategoriesPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CircularProgress from '@mui/material/CircularProgress';
import { NavbarProps } from './types';

function App() {
  const [data, setData] = useState<NavbarProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/page_data.json')
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className='w-full h-full flex bg-white justify-center items-center'>
      <CircularProgress size={30} thickness={5} color='error'/>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header data={data} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/categories" element={<CategoriesPage data={data} />} />
            <Route path="/sub-categories/:id" element={<CategoriesPage data={data} />} />
            <Route path="/products/:id" element={<ProductsPage data={data} />} />
            <Route path="/contact" element={<ContactPage data={data} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Favorite from './pages/Favorite';
import Card from './pages/Card';
import OrderForm from './pages/OrderForm';
import CardDescription from './pages/CardDescription';
import ScrollToTop from './components/ScrollToTop';
import Faqs from './pages/Faqs';
import Footer from './components/Footer';
import Login from './components/Login';
import { useContext, useState } from 'react';
import { StoreContext } from './contexts/StoreContext';

function App() {

  const { isShowLogin, setIsShowLogin } = useContext(StoreContext);

  return (
    <div className='flex flex-col items-center justify-between gap-0 p-0 m-0'>
      <ScrollToTop />
      <Navbar />
      {isShowLogin && <Login onClose={() =>setIsShowLogin(false)} isShowLogin={isShowLogin} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/card' element={<Card />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/orderform' element={<OrderForm />} />
          <Route path='/card-description/:id' element={<CardDescription />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App;

import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Services from '../components/Services';
import About from '../components/About';
import FoodDisplay from '../components/FoodDisplay';

const Home = () => {
  return (
    <div className='w-full h-auto'>
      <Header />
      <Services />
      <About />
      <FoodDisplay />
    </div>
  )
}

export default Home;

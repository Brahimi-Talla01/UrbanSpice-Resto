import { useRef } from 'react';
import Header from '../components/Header';
import Services from '../components/Services';
import About from '../components/About';
import FoodDisplay from '../components/FoodDisplay';
import ScrollToTopButton from '../components/SrollToTopButton';
import OurChefs from '../components/OurChefs';
import ReservationForm from '../components/ReservationForm';
import Contact from '../components/Contact';
import Testimony from '../components/Testimony';
import FaqsSection from '../components/FaqsSection';

const Home = () => {

  const foodRef = useRef(null);
  const resRef = useRef(null);

  const handleFoodNavigate = () => {
    foodRef.current?.scrollIntoView({ behavior: 'smooth' })
  };
  const handleReservationNavigate = () => {
    resRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className='w-full h-auto'>
      <Header 
        onScrollToMenu={handleFoodNavigate} 
        onScrollReservation={handleReservationNavigate} 
      />
      <Services />
      <About />
      <div ref={foodRef}>
        <FoodDisplay />
      </div>
      <OurChefs />
      <div ref={resRef}>
        <ReservationForm />
      </div>
      <Contact />
      <div>
        <FaqsSection />
      </div>
      <Testimony />


      <ScrollToTopButton />
    </div>
  )
}

export default Home;

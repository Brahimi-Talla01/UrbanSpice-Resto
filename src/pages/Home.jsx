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

const Home = () => {

  const foodRef = useRef(null);

  const handleFoodNavigate = () => {
    foodRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className='w-full h-auto'>
      <Header onScrollToMenu={handleFoodNavigate} />
      <Services />
      <About />
      <div ref={foodRef}>
        <FoodDisplay />
      </div>
      <OurChefs />
      <ReservationForm />
      <Contact />
      <Testimony />


      <ScrollToTopButton />
    </div>
  )
}

export default Home;

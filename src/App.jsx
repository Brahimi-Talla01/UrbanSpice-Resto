import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Navbar from './components/Navbar';
import Favorite from './pages/Favorite';
import Card from './pages/Card';
import OrderForm from './pages/OrderForm';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/card' element={<Card />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/orderform' element={<OrderForm />} />
      </Routes>
    </div>
  )
}

export default App;

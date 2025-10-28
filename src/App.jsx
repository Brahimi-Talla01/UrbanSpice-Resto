import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Card from './pages/Card';
import OrderForm from './pages/OrderForm';
import CardDescription from './pages/CardDescription';
import Login from './components/Login';
import { useContext } from 'react';
import { StoreContext } from './contexts/StoreContext';
import MainLayout from './components/admin/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import FoodMenu from './pages/admin/FoodMenu';
import Order from './pages/admin/Order';
import BookATable from './pages/admin/BookATable';
import Service from './pages/admin/Service';
import Chefs from './pages/admin/Chefs';
import Testimony from './pages/admin/Testimony';

function App() {

  const { isShowLogin, setIsShowLogin } = useContext(StoreContext);

  return (
    <div className='flex flex-col items-center justify-between gap-0 p-0 m-0'>

      {isShowLogin && <Login onClose={() =>setIsShowLogin(false)} isShowLogin={isShowLogin} />}
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/card' element={<MainLayout><Card /></MainLayout>} />
        <Route path='/favorite' element={<MainLayout><Favorite /></MainLayout>} />
        <Route path='/orderform' element={<MainLayout><OrderForm /></MainLayout>} />
        <Route path='/card-description/:id' element={<MainLayout><CardDescription /></MainLayout>} />

        <Route path="/admin" element={<AdminLayout> {true ? <Layout /> : <Login /> } </AdminLayout>} > 
          <Route index element={<Dashboard />} />
          <Route path='menu' element={<FoodMenu />} />
          <Route path='commande' element={<Order />} />
          <Route path='reservation' element={<BookATable />} />
          <Route path='service' element={<Service />} />
          <Route path='chefhat' element={<Chefs />} />
          <Route path='temoignage' element={<Testimony />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;

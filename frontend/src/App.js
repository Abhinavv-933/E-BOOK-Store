import { Routes, Route} from 'react-router-dom';
import Header from './pages/header/Header';

//auth Component
import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';
import AdminDashboard from './pages/Admin/components/dashboard/adminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/customerDashboard';
import PostBook from './pages/Admin/components/post-book/PostBook';
import UpdateBook from './pages/Admin/components/update-book/UpdateBook';
import ViewOrders from './pages/Admin/components/view-orders/ViewOrders';
import Cart from './pages/customer/components/cart/cart';
import MyOrders from './pages/customer/components/my-orders/MyOrders';

function App() {
  return (
    <>
      {/* Header Cmponent */}
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to E-Book Store</h1>} />
        {/* Auth components */}
        <Route path='/register' element ={<Signup />} />
        <Route path='/login' element = {<Signin />} />

        {/* Admin Components */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/book/post' element={<PostBook />} />
        <Route path='/admin/book/:id/edit' element={<UpdateBook />} />
        <Route path='/admin/book/orders' element={<ViewOrders />} />

        
        {/* Customer components */}
         <Route path='/customer/dashboard' element={<CustomerDashboard />} />
         <Route path='/customer/cart' element={<Cart />} />
         <Route path='/customer/MyOrders' element={<MyOrders />} />

      </Routes>
    </>
  );
}

export default App;

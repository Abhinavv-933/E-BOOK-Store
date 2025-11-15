import { Routes, Route} from 'react-router-dom';
import Header from './pages/header/Header';

//auth Component
import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';
import AdminDashboard from './pages/Admin/components/dashboard/adminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/customerDashboard';

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
        
        {/* Customer components */}
         <Route path='/customer/dashboard' element={<CustomerDashboard />} />

      </Routes>
    </>
  );
}

export default App;

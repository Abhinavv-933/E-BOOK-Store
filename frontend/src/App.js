import { Routes, Route} from 'react-router-dom';
import Header from './pages/header/Header';

//auth Component
import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to E-Book Store</h1>} />
        {/* Auth components */}
        <Route path='/register' element ={<Signup />} />
        <Route path='/login' element = {<Signin />} /> 
      </Routes>
    </>
  );
}

export default App;

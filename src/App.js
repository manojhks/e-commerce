import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Loginpage } from './pages/Loginpage';
import { Registerpage } from './pages/Registerpage';
import { Homepage } from './pages/Homepage';
import { Cart } from './components/Cart';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage/>} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/home' element={<Homepage/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

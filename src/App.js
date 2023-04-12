
import './App.css';
import Home from './screens/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
    <div >
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;

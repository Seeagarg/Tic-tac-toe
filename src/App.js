import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Input from './Components/Input';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="text-black">
    <Routes>
    <Route path='/' element={<Input/>}/>
    <Route path='/game' element={<Home/>}/>
    </Routes>
    </div>
  );
}

export default App;

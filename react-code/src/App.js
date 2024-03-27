import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Predictions from './components/Predictions';
import Login from './components/Login';
import Navigation from './components/Navigation';
function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navigation/>
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/analytics" element={Analytics}/>
      <Route path="/predictions" element={Predictions}/>
      <Route path="/login" element={Login}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='createaccount' element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;


import './App.css';

import {
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/Home';
import Display from './pages/Display';
import Login from './pages/Login/Login';
import Result from './pages/Result';

import { useUsers } from './providers/UserProvider'

function App() {
  const { user } = useUsers()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user.name ? <Home /> : <Login />} />
        <Route path="/:lang/:textId" element={<Display />} /> 
        <Route path="/:lang/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;


import './App.css';

import {
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/Home';
import Display from './pages/Display';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:lang/:textId" element={<Display />} /> 
      </Routes>
    </div>
  );
}

export default App;

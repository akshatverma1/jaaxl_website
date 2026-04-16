import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import JobApplication from './pages/JobApplication';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/sales-person" element={<JobApplication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

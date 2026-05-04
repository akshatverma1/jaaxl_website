import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import JobApplication from './pages/JobApplication';
import WebDevelopment from './pages/WebDevelopment';
import AppDevelopment from './pages/AppDevelopment';
import AIAutomation from './pages/AIAutomation';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/sales-person" element={<JobApplication />} />
          {/* SEO Service Landing Pages — each targets a specific search keyword */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


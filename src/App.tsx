import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DiscreetBanner } from './components/DiscreetBanner';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { FakeCallModal } from './components/FakeCallModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { SOSPage } from './pages/SOSPage';
import { EvidencePage } from './pages/EvidencePage';
import { RefusalPage } from './pages/RefusalPage';
import { CasePage } from './pages/CasePage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NeutralPage } from './pages/NeutralPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isNeutralPage = location.pathname === '/neutral';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Global simulated components */}
      <ToastContainer />
      <FakeCallModal />

      {/* Show Navbar & Footer only on normal pages, not on the neutral Quick Exit page */}
      {!isNeutralPage && (
        <>
          <Navbar />
          <DiscreetBanner />
        </>
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/refusal" element={<RefusalPage />} />
          <Route path="/case/:id" element={<CasePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/neutral" element={<NeutralPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!isNeutralPage && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

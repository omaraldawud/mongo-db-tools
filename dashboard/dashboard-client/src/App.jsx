import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import LogoComponent from './components/LogoComponent';
import './assets/css/dashboard.css';

export default function App() {
  const [activeTab, setActiveTab] = useState(0); // Initialize with first tab

  return (
    <div className="d-flex vh-100">
      {/* First Sidebar (Vertical Text) */}
      <div className="d-flex flex-column bg-success" style={{ width: '40px' }}>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div 
            className="fw-bolder fs-3 text-muted" 
            style={{
              writingMode: 'vertical-lr',
              transform: 'rotate(180deg)',
              letterSpacing: '0.5rem'
            }}
          >
            DASHBOARD
          </div>
        </div>
      </div>

      {/* Second Sidebar (With Logo) */}
      <div  className="d-flex flex-column bg-secondary" 
            style={{ minHeight: '100vh' }}>
        <div className="d-flex align-items-center justify-content-center bg-primary" 
             style={{ height: '100px', width: '100%', flexShrink: 0 }}>
          <LogoComponent />
        </div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <Topbar />
        <main className="container-fluid p-4">
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
    </div>
  );
}
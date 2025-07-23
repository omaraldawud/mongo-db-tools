import { Overview, Collections, Exports } from "../components/functional";

export default function Dashboard({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 0, label: 'Overview', component: <Overview /> },
    { id: 1, label: 'Collections', component: <Collections /> },
    { id: 2, label: 'Exports', component: <Exports /> }
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tab-nav mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            { tab.label }
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTab].component}
      </div>
    </div>
  );
}
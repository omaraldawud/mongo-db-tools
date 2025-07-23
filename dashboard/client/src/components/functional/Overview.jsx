// src/components/functional/Overview.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faDatabase, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export default function Overview() {
  const dbStats = {
    collections: 24,
    documents: 145689,
    storage: '3.2 GB',
    indexes: 47
  };

  return (
    <div className="dashboard-grid">
      <div className="card-tech">
        <div className="card-header-tech">
          <FontAwesomeIcon icon={faServer} className="icon-lg" />
          <h3>Cluster Overview</h3>
        </div>
        <div className="card-body-tech">
          <div className="metric-group">
            <MetricCard 
              icon={<FontAwesomeIcon icon={faDatabase} />}
              title="Collections"
              value={dbStats.collections}
              trend="+3 this week"
            />
            <MetricCard 
              icon={<FontAwesomeIcon icon={faMicrochip} />}
              title="Indexes"
              value={dbStats.indexes}
              trend="2 unused"
            />
          </div>
          <div className="storage-bar">
            <div className="storage-label">Storage Used: {dbStats.storage}</div>
            <div className="progress-tech">
              <div 
                className="progress-fill-tech" 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <RecentActivity />
    </div>
  );
}

// MetricCard component
const MetricCard = ({ icon, title, value, trend }) => (
  <div className="metric-card">
    <div className="metric-icon">{icon}</div>
    <div>
      <div className="metric-value">{value}</div>
      <div className="metric-title">{title}</div>
      <div className="metric-trend">{trend}</div>
    </div>
  </div>
);

// RecentActivity component
const RecentActivity = () => (
  <div className="card-tech">
    <div className="card-header-tech">
      <h3>Recent Activity</h3>
    </div>
    <div className="card-body-tech">
      <ul className="activity-list">
        <ActivityItem time="2 min ago" action="Created collection 'users'" />
        <ActivityItem time="15 min ago" action="Index added to 'products'" />
        <ActivityItem time="1 hour ago" action="Exported 1,200 documents" />
      </ul>
    </div>
  </div>
);

// ActivityItem component
const ActivityItem = ({ time, action }) => (
  <li className="activity-item">
    <div className="activity-time">{time}</div>
    <div className="activity-action">{action}</div>
  </li>
);

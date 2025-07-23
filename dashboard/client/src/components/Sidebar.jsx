// src/components/Sidebar.jsx
import React from 'react';
import NavItem from './NavItem';
import { 
  faTachometerAlt, 
  faFolder, 
  faChartBar, 
  faDownload,
  faSearch,
  faFilter,
  faCog,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { icon: faTachometerAlt, title: 'Overview' },
    { icon: faFolder, title: 'Collections' },
    { icon: faChartBar, title: 'Stats' },
    { icon: faDownload, title: 'Exports' },
    { icon: faSearch, title: 'Query Builder' },
    { icon: faFilter, title: 'Aggregation' },
    { icon: faCog, title: 'Indexes' },
    { icon: faDatabase, title: 'DB Status' }
  ];

  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <ul className="nav flex-column gap-1">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            title={item.title}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </ul>
    </div>
  );
}

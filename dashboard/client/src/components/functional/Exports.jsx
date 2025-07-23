import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExport, faHistory, faFolder  } from '@fortawesome/free-solid-svg-icons';

export default function Exports() {
  const [exportFormat, setExportFormat] = useState('json');
  const [selectedCollections, setSelectedCollections] = useState([]);

  const collections = ['users', 'products', 'orders', 'logs'];

  const toggleCollection = (collection) => {
    setSelectedCollections(prev => 
      prev.includes(collection) 
        ? prev.filter(c => c !== collection) 
        : [...prev, collection]
    );
  };

  return (
    <div className="dashboard-grid" style={{ minWidth: '100%' }}>
      <div className="card-tech" style={{ gridColumn: '1 / -1' }}>
        <div className="card-header-tech">
          <h3>Data Export</h3>
        </div>
        <div className="card-body-tech">
          <div className="export-controls" style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="format-selector">
              <h4>Export Format</h4>
              <label>
                <input
                  type="radio"
                  checked={exportFormat === 'json'}
                  onChange={() => setExportFormat('json')}
                />
                <FontAwesomeIcon icon={faFileExport} className="me-2" />
                JSON
              </label>
              <label>
                <input
                  type="radio"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                />
                <FontAwesomeIcon icon={faFileExport} className="me-2" />
                CSV
              </label>
            </div>

            <div className="collection-selector">
              <h4>Select Collections</h4>
              {collections.map(collection => (
                <div key={collection} className="collection-checkbox">
                  <input
                    type="checkbox"
                    id={`export-${collection}`}
                    checked={selectedCollections.includes(collection)}
                    onChange={() => toggleCollection(collection)}
                  />
                  <label htmlFor={`export-${collection}`}>
                    <FontAwesomeIcon icon={faFolder} className="me-2" />
                    {collection}
                  </label>
                </div>
              ))}
            </div>

            <button className="export-button">
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div  className="card-tech" 
            style={{ width:"800px !important" , gridColumn: '1 / -1' }}
      >
        <div className="card-header-tech">
          <h3>Export History</h3>
        </div>
        <div className="card-body-tech">
          <div className="history-item">
            <FontAwesomeIcon icon={faHistory} className="me-3" />
            <span>users.json - 2 days ago - 45MB</span>
          </div>
          <div className="history-item">
            <FontAwesomeIcon icon={faHistory} className="me-3" />
            <span>products.csv - 1 week ago - 12MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
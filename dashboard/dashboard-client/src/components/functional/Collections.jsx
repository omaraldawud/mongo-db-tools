import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState('');
  const collections = [
    { name: 'users', count: 45231, size: '1.2 GB', indexes: 5 },
    { name: 'products', count: 8924, size: '450 MB', indexes: 3 },
    { name: 'orders', count: 15678, size: '780 MB', indexes: 4 },
    { name: 'logs', count: 75892, size: '2.1 GB', indexes: 2 }
  ];

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-grid" style={{ minWidth: '100%' }}>
      <div className="card-tech" style={{ gridColumn: '1 / -1' }}>
        <div className="card-header-tech">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h3 className="mb-0">Collections</h3>
            <div className="search-bar" style={{ width: '300px' }}>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </div>
          </div>
        </div>
        <div className="card-body-tech">
          {filteredCollections.length > 0 ? (
            <div className="table-responsive">
              <table className="collection-table w-100">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Documents</th>
                    <th>Size</th>
                    <th>Indexes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollections.map((collection, index) => (
                    <tr key={index}>
                      <td>
                        <FontAwesomeIcon icon={faFolder} className="collection-icon me-2" />
                        {collection.name}
                      </td>
                      <td>{collection.count.toLocaleString()}</td>
                      <td>{collection.size}</td>
                      <td>{collection.indexes}</td>
                      <td>
                        <button className="btn-action me-2">View</button>
                        <button className="btn-action">Indexes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results text-center py-4">
              No collections found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
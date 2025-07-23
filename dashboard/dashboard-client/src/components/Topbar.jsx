// src/components/Topbar.jsx
export default function Topbar() {
  return (
    <nav  className="navbar navbar-expand text-white bg-danger px-4" 
          style={{ height: '100px' }}>
      <h1 className="m-0 fs-4">Mongo CLI Dashboard</h1>
      <div className="ms-auto">
        <span className="badge bg-dark text-white fs-6 px-4 py-2">
          v1.0.0
        </span>
      </div>
    </nav>
  );
}
// src/components/NavItem.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavItem({ 
  icon, 
  title, 
  active = false,
  onClick 
}) {
  return (
    <li className="nav-item">
      <a 
        className={`nav-link-tech d-flex align-items-center py-3 px-3 rounded ${active ? 'active' : ''}`}
        onClick={onClick}
        href="#"
      >
        <FontAwesomeIcon icon={icon} className="me-3 fs-5" />
        <span>{title}</span>
      </a>
      <div className="border-bottom border-secondary opacity-25 my-1"></div>
    </li>
  );
}

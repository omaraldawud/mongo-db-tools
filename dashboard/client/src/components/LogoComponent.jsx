    
export default function LogoComponent() {
        return (
        <div className="digital-logo">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <rect x="5" y="5" width="30" height="30" rx="3" stroke="#00ffff" strokeWidth="2"/>
                <path d="M12 12 L28 12 M12 20 L28 20 M12 28 L28 28" stroke="#00ffff" strokeWidth="2"/>
                <path d="M12 16 L28 16 M12 24 L28 24" stroke="#00ffff" strokeWidth="1" strokeDasharray="2 2"/>
            </svg>
        </div>
 );
}
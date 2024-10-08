import { Link } from 'react-router-dom';
import './ToolBar.module.css';

function ToolBar() {
  return (
    <div className="Grid">
      <Link to="/Room1" className="ToolBar" style={{ textDecoration: 'none', gridArea: 'a' }}>
        Room1
      </Link>
      <Link to="/Room2Page" className="ToolBar" style={{ textDecoration: 'none', gridArea: 'b' }}>
        Room2
      </Link>
      <Link to="/Room3Page" className="ToolBar" style={{ textDecoration: 'none', gridArea: 'c' }}>
        Room3
      </Link>
      <div style={{ gridArea: 'f', backgroundColor: '#ffffff' }} />

      <div className="Inventory" />
    </div>
  );
}

export default ToolBar;

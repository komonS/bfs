import React from 'react';
import '../../css/Sidebar.css'
import { Link, useHistory } from "react-router-dom";
function Sidebar() {

  return (
    <div className="side-bar">
      <ul className="nav flex-column">
        <li className="nav-item side-nav">
          <Link to="/mybike" href="#"><i class="fas fa-motorcycle"></i> &nbsp;&nbsp;My Bike</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

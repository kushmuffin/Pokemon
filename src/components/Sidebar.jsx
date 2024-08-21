import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2>Sidebar</h2>
      <div className='sidebar-content'>
        <p>
          <Link to="/trainer-form">訓練師資料</Link>
        </p>
        <p>
          <Link to="/pokemon-list">寶可夢列表</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

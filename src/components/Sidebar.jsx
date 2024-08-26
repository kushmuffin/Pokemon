import React from 'react';
import { Link } from 'react-router-dom';

import pokemon_banner from '../assets/pokemon-banner.png'
import nintendo_banner from '../assets/nintendo-banner.png'

const Sidebar = () => {
  return (
    <aside className='aside'>
      <div className='sidebar'>
        <h2>Sidebar</h2>
        <div className='sidebar-content'>
          <div>
            <p>
              <Link to="/trainer-form">訓練師資料</Link>
            </p>
            <p>
              <Link to="/pokemon-list">寶可夢列表</Link>
            </p>
            <p>
              <Link to="/pokemon-list">寶可夢列表</Link>
            </p>
          </div>
          <div className='sidebar-link'>
            <a href="https://tw.portal-pokemon.com/">
              <img src={pokemon_banner} alt="" />
            </a>
            <a href="https://www.nintendo.tw/">
              <img src={nintendo_banner} alt="" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

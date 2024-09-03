import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TrainerContext } from './TrainerContext';

import pokemon_banner from '../assets/pokemon-banner.png'
import nintendo_banner from '../assets/nintendo-banner.png'
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const Sidebar = () => {
  const { trainerData  } = useContext(TrainerContext);

  return (
    <aside className='aside'>
      <div className='sidebar'>
        <h2>Sidebar</h2>
        <div className='sidebar-area'>
          <div className='sidebar-content'>
            <Link className='sidebar-item'to="/trainerform">
              <span>訓練師資料</span>
            </Link>
            <Link className='sidebar-item'to="/pokemonlist">
              <span>寶可夢列表</span>
            </Link>
            <Link className='sidebar-item'to="/area">
              <span>地區地圖</span>
            </Link>
            <Link className='sidebar-item'to="/abilities">
              <span>特性列表</span>
            </Link>
            <Link className='sidebar-item'to="/moves">
              <span>招式列表</span>
            </Link>
          </div>
          <div>
            {trainerData.length === 0 ? (
              <p>目前沒有訓練師資料</p>
            ) : (
              <div>
                {trainerData.map((trainer, index) => (
                  <div key={index}>
                    <div className='sidebartrainer'>
                      <img
                        src={trainer.gender === 'male' ? male_character : female_character}
                        alt={trainer.userName}
                        style={{ width: '30px', marginRight: '10px' }}
                      />
                      {trainer.userName}
                    </div>
                    <div>
                      {trainer.pokemons.map((pokemon, idx) => (
                        // {/* <p key={idx}>{pokemon.name}</p> */}
                        <img className='bitimg' onClick={() => handleDetailClick(pokemon)} src={pokemon.sprites.front_default} alt={pokemon.name}   style={{ width: '70px'}}/>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      </div>
    </aside>
  );
};

export default Sidebar;

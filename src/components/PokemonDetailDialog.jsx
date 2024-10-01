import React from 'react';
import { pokemonName, ability } from '../Translations'; //翻譯檔
import RadarChart from './RadarChart'; // 引入 Radar 圖表

const PokemonDetailDialog = ({ pokemon, onClose }) => {
  const allTranslations = {
    ...pokemonName
  }; // 翻譯寶可夢名稱

  if (!pokemon) return null; // 如果沒有寶可夢資料則不顯示對話框

  // 點擊對話框外部的灰色區域時，關閉對話框
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 將特性名稱轉換為中文
  const translatedAbilities = pokemon?.abilities?.map(obj => {
    const abilityName = obj.ability.name;
    return ability[abilityName] || abilityName; // 使用翻譯檔中的名稱，若無翻譯則使用原名稱
  }).join(', ');

  const pokemonStats = {
    hp: pokemon.stats?.find(stat => stat.stat.name === 'hp')?.base_stat,
    attack: pokemon.stats?.find(stat => stat.stat.name === 'attack')?.base_stat,
    defense: pokemon.stats?.find(stat => stat.stat.name === 'defense')?.base_stat,
    specialAttack: pokemon.stats?.find(stat => stat.stat.name === 'special-attack')?.base_stat,
    specialDefense: pokemon.stats?.find(stat => stat.stat.name === 'special-defense')?.base_stat,
    speed: pokemon.stats?.find(stat => stat.stat.name === 'speed')?.base_stat
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-content">
        <div className=''>
          <img className='artwork' src={pokemon.sprites?.other?.['official-artwork']?.front_default} alt={pokemon.name} />
          <h2>{allTranslations[pokemon.name] || pokemon.name}</h2>
          {/* <p>編號: {pokemon.id}</p> */}
          <p>特性: {translatedAbilities}</p>
          <span>高度: {pokemon.height}</span>{' '}
          <span>重量: {pokemon.weight}</span>
          <p>基礎經驗值: {pokemon.base_experience}</p>
        </div>
        <div className='dialog-chart'>
          <RadarChart pokemonStats={pokemonStats} /> {/* 使用 RadarChart 組件 */}
          <table>
          <thead>
            <tr>
              <th>生命值</th>
              <th>攻擊力</th>
              <th>防禦力</th>
              <th>特攻</th>
              <th>特防</th>
              <th>速度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'hp')?.base_stat}</p>
              </td>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'attack')?.base_stat}</p>
                </td>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'defense')?.base_stat}</p>
                </td>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'special-attack')?.base_stat}</p>
                </td>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'special-defense')?.base_stat}</p>
                </td>
              <td>
                <p>{pokemon.stats?.find(stat => stat.stat.name === 'speed')?.base_stat}</p>
              </td>
            </tr>
          </tbody>
          </table>
          <button onClick={onClose}>關閉</button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailDialog;

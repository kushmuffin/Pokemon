import React from 'react';
import { ability } from '../typeTranslations'; // 匯入翻譯檔

const PokemonDetailDialog = ({ pokemon, onClose }) => {
  if (!pokemon) return null; // 如果沒有寶可夢資料則不顯示對話框

  // 點擊對話框外部的灰色區域時，關閉對話框
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 將特性名稱轉換為繁體中文
  const translatedAbilities = pokemon?.abilities?.map(obj => {
    const abilityName = obj.ability.name;
    return ability[abilityName] || abilityName; // 使用翻譯檔中的名稱，若無翻譯則使用原名稱
  }).join(', ');

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-content">
        <h2>{pokemon.name}</h2>
        <img className='artwork' src={pokemon.sprites?.other?.['official-artwork']?.front_default} alt={pokemon.name} />
        <p>編號: {pokemon.id}</p>
        <p>特性: {translatedAbilities}</p>
        <p>高度: {pokemon.height}</p>
        <p>重量: {pokemon.weight}</p>
        <p>基礎經驗值: {pokemon.base_experience}</p>
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
        {/* <p>生命值: {pokemon.stats?.find(stat => stat.stat.name === 'hp')?.base_stat}</p>
        <p>攻擊力: {pokemon.stats?.find(stat => stat.stat.name === 'attack')?.base_stat}</p>
        <p>防禦力: {pokemon.stats?.find(stat => stat.stat.name === 'defense')?.base_stat}</p>
        <p>特攻: {pokemon.stats?.find(stat => stat.stat.name === 'special-attack')?.base_stat}</p>
        <p>特防: {pokemon.stats?.find(stat => stat.stat.name === 'special-defense')?.base_stat}</p>
        <p>速度: {pokemon.stats?.find(stat => stat.stat.name === 'speed')?.base_stat}</p> */}
        <button onClick={onClose}>關閉</button>
      </div>
    </div>
  );
};

export default PokemonDetailDialog;

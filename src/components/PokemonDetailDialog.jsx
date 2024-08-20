import React from 'react';

const PokemonDetailDialog = ({ pokemon, onClose }) => {
  if (!pokemon) return null; // 如果沒有寶可夢資料則不顯示對話框

  // 點擊對話框外部的灰色區域時，關閉對話框
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-content">
        <h2>{pokemon.name}</h2>
        <img className='artwork' src={pokemon.sprites?.other?.['official-artwork']?.front_default} />
        {/* <div> */}
          <p>編號: {pokemon.id}</p>
          <p>特性: {pokemon?.abilities?.map(obj => obj.ability.name).join(', ')}</p>
          <p>高度: {pokemon.height}</p>
          <p>重量: {pokemon.weight}</p>
          <p>基礎經驗值: {pokemon.base_experience}</p>
          <p>生命值: {pokemon.stats?.find(stat => stat.stat.name === 'hp')?.base_stat}</p>
          <p>攻擊力: {pokemon.stats?.find(stat => stat.stat.name === 'attack')?.base_stat}</p>
          <p>防禦力: {pokemon.stats?.find(stat => stat.stat.name === 'defense')?.base_stat}</p>
          <button onClick={onClose}>關閉</button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PokemonDetailDialog;

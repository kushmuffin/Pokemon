import React, { useState, useEffect, useContext } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchAllPokemonTypes } from './PokemonApi'; // 假設 api 文件名為 api.js
import PokemonDetailDialog from './PokemonDetailDialog';
import { TrainerContext } from './TrainerContext';

import typeTranslations from '../typeTranslations';


const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]); // 從API取得所有寶可夢列表
  const [currentPage, setCurrentPage] = useState(1); // 控制世代以顯示寶可夢
  const [pokemonList, setPokemonList] = useState([]); // 每個寶可夢的詳細資訊(姓名、屬性等)與圖片

  const [inputValue, setInputValue] = useState(''); // 搜尋關鍵字
  const [filteredPokemon, setFilteredPokemon] = useState([]); // 符合關鍵字搜尋條件的寶可夢列表
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 顯示被選中的寶可夢的詳細資料(Dialog)

  const [types, setTypes] = useState([]);  // 從API取得所有寶可夢屬性
  const [selectedType, setSelectedType] = useState(''); // 選擇的屬性

  const { addPokemon } = useContext(TrainerContext); // 使用上下文

  useEffect(() => { // 初始渲染
    const getPokemonList = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonData(data);
        console.log('Pokemon list fetched:', data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };
    getPokemonList();
  }, []);

  useEffect(() => { // 帶入屬性
    const getTypes = async () => {
      try {
        const typesData = await fetchAllPokemonTypes(); // 獲取所有屬性
        setTypes(typesData); // 存入 state
        console.log('Pokemon type fetched:', typesData);
      } catch (error) {
        console.error('Error fetching Pokemon type:', error);
      }
    };
    getTypes();
  }, []);

  useEffect(() => { // 切換世代
    const getPokemonGen = async () => {
      try {
        const start = generations[currentPage].start;
        const end = generations[currentPage].end;
        const details = await Promise.all(
          pokemonData.slice(start, end).map(async (pokemon) => {
            try {
              const detail = await fetchPokemonDetails(pokemon.url);
              return detail;
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );
        const validDetails = details.filter(detail => detail !== null); // 過濾掉 null 值（有問題的寶可夢）
        setPokemonList(validDetails); // 初始時顯示寶可夢
        setFilteredPokemon(validDetails); // 搜尋寶可夢
        console.log('Pokemon details fetched:', validDetails);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    // if (pokemonData.length > 0) {
      getPokemonGen();
    // }
  }, [pokemonData, currentPage]);

  useEffect(() => { // 以屬性搜索寶可夢
    const filtered = pokemonList.filter(pokemon => {
      // 如果沒有選擇任何屬性，顯示所有寶可夢
      if (!selectedType) return true;
      // 檢查寶可夢是否包含所選屬性
      return pokemon.types.some(type => type.type.name === selectedType);
    }).filter(pokemon =>
      pokemon.name?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [pokemonList, selectedType, inputValue]);

  // 顯示數量，用於按鈕
  const generations = {
    1: { start: 0, end: 151 },
    2: { start: 151, end: 251 },
    3: { start: 251, end: 386 },
    4: { start: 386, end: 493 },
    5: { start: 493, end: 649 },
    6: { start: 649, end: 721 },
    7: { start: 721, end: 809 },
    8: { start: 809, end: 905 },
    9: { start: 905, end: 1025 }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => { // 切換世代按鈕
    const totalPages = Object.keys(generations).length;
    const buttons = [];
    const generation = ['紅／綠', '金／銀', '紅寶石／藍寶石', '鑽石／珍珠', '黑／白', 'X／Y', '太陽／月亮', '劍／盾', '朱／紫' ]
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`gen-button ${currentPage === i ? 'active' : ''}`}>
          {generation[i - 1]}
        </button>
      );
    }
    return <div>{buttons}</div>;
  };

  const handleInputChange = (e) => { //搜尋功能
    setInputValue(e.target.value);
    console.log('Input value:', e.target.value);
  };

  const handleSearch = () => {
    console.log('Input value at search:', inputValue);
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name?.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log('Filtered Pokemon:', filtered);
    setFilteredPokemon(filtered);
  };

  const handleKeyDown = (e) => { //Enter輸入搜尋
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDetailClick = (pokemonDetail) => { // 打開PokemonDetailDialog顯示更多資訊
    setSelectedPokemon(pokemonDetail);
    // alert(`Details for ${pokemon.name}`);
  };

  const handleAddToListClick = (pokemon) => { // 將寶可夢資料加入列表 (TrainerContext)
    addPokemon(pokemon);
    alert(`${pokemon.name} added to list`);
  };

  const handleCloseDialog = () => { // 關閉對話框
    setSelectedPokemon(null);
  };

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
  };

  const typeColors = {
    "normal": "#A8A77A",
    "fighting": "#C22E28",
    "flying": "#A98FF3",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "rock": "#B6A136",
    "bug": "#A6B91A",
    "ghost": "#735797",
    "steel": "#B7B7CE",
    "fire": "#EE8130",
    "water": "#6390F0",
    "grass": "#7AC74C",
    "electric": "#F7D02C",
    "psychic": "#F95587",
    "ice": "#96D9D6",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "fairy": "#D685AD",
    "stellar": "#D8A6FF",
    "unknown": "#68A090"
  }

  return (
    <div className='context'>
      <h1>寶可夢列表</h1>
      <div>
        {renderPagination()}
        <select className='enter'
          style={{ height: '45px' }}
          placeholder="全部屬性"
          value={selectedType}
          onChange={handleChangeType}
        >
          <option key="0" value="">全部屬性</option>
          {types.map((type, index) => (
            <option key={index + 1} value={type.name}>{typeTranslations[type.name]}</option> // 顯示屬性名稱
          ))}
        </select>
        <input
          className='enter'
          type='text'
          placeholder='輸入名稱'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // 添加 onKeyDown 事件，搜尋可用enter輸入搜尋
        />
        <button onClick={handleSearch}>搜尋</button>
      </div>
      {filteredPokemon.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className='pokemon-content'>
          {filteredPokemon.map((pokemon) => (
            <div 
              className='pokemon-item' 
              key={pokemon.id}
              style={{ background: pokemon.types.length > 1 
              ? `linear-gradient(135deg, ${typeColors[pokemon.types[0].type.name]} 40%, ${typeColors[pokemon.types[1].type.name]} 60%)`
              : typeColors[pokemon.types[0].type.name] }}
            >
              <img className='bitimg' src={pokemon.sprites.front_default} alt={pokemon.name} />
              <div className='pokemon-description'>
                <span>#{pokemon.id}</span>
                {/* <span>{allTranslations[pokemon.name] || pokemon.name}</span> */}
                <span>{pokemon.name}</span>
                <div>
                  {pokemon.types.map(typeInfo => (
                  <span style={{'fontSize': '14px'}} key={typeInfo.type.name}>{typeTranslations[typeInfo.type.name] || typeInfo.type.name}</span>
                  ))}
                </div>
              </div>
              <div>
                <button className='detail_btn' onClick={() => handleDetailClick(pokemon)}><span>詳細資料</span></button>
                <button className='add_btn' onClick={() => handleAddToListClick(pokemon)}><span>加入列表</span></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 新增 PokemonDetailDialog */}
      {selectedPokemon && (
        <PokemonDetailDialog 
          pokemon={selectedPokemon} 
          onClose={handleCloseDialog} 
        />
      )}

        {/* <table style={{'display': 'none'}}>
          <thead>
            <tr>
              <th>編號</th>
              <th>圖片</th>
              <th>名稱</th>
              <th>身高</th>
              <th>體重</th>
              <th>基礎經驗值</th>
              <th>生命值</th>
              <th>攻擊力</th>
              <th>防禦力</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemonDetails.map((pokemon) => {
              const hpStat = pokemon.stats?.find(stat => stat.stat.name === 'hp');
              const attackStat = pokemon.stats?.find(stat => stat.stat.name === 'attack');
              const defenseStat = pokemon.stats?.find(stat => stat.stat.name === 'defense');

              const hp = hpStat ? hpStat.base_stat : 'N/A';
              const attack = attackStat ? attackStat.base_stat : 'N/A';
              const defense = defenseStat ? defenseStat.base_stat : 'N/A';

              return (
                <tr key={pokemon.id}>
                  <td>#{pokemon.id}</td>
                  <td>
                    {pokemon.sprites?.front_default ? (
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.height}</td>
                  <td>{pokemon.weight}</td>
                  <td>{pokemon.base_experience}</td>
                  <td>{hp}</td>
                  <td>{attack}</td>
                  <td>{defense}</td>
                  <td>
                    <button onClick={() => handleDetailClick(pokemon)}>詳細資料</button> {' '}
                    <button onClick={() => handleAddToListClick(pokemon)}>加入列表</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
    </div>
  );
};

export default PokemonList;

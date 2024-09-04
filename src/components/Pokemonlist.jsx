import React, { useState, useEffect, useContext } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from './PokemonApi'; // 假設 api 文件名為 api.js
import PokemonDetailDialog from './PokemonDetailDialog';
import { TrainerContext } from './TrainerContext';

import typeTranslations from '../typeTranslations';
import { generation1, generation2, generation3, generation4, generation5 } from '../typeTranslations';



const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [filteredPokemonDetails, setFilteredPokemonDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 用於儲存被選中的寶可夢

  const { addPokemon } = useContext(TrainerContext); // 使用上下文

  const allTranslations = { ...generation1, ...generation2, ...generation3, ...generation4, ...generation5 }; // 翻譯寶可夢名稱

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data);
        console.log('Pokemon list fetched:', data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };
    getPokemonList();
  }, []);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const start = generations[currentPage].start;
        const end = generations[currentPage].end;
        const details = await Promise.all(
          pokemonList.slice(start, end).map(async (pokemon) => {
            try {
              const detail = await fetchPokemonDetails(pokemon.url);
              return detail;
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );
        // 過濾掉 null 值（有問題的寶可夢）
        const validDetails = details.filter(detail => detail !== null);
        setPokemonDetails(validDetails);
        setFilteredPokemonDetails(validDetails); // 初始時顯示所有寶可夢
        console.log('Pokemon details fetched:', validDetails);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    if (pokemonList.length > 0) {
      getPokemonDetails();
    }
  }, [pokemonList, currentPage]);

  //控制世代、顯示數量
  const generations = {
    1: { start: 0, end: 151 },
    2: { start: 151, end: 251 },
    3: { start: 251, end: 386 },
    4: { start: 386, end: 493 },
    5: { start: 493, end: 649 }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Object.keys(generations).length;
    const buttons = [];
    const generation = ['紅／綠', '金／銀', '紅寶石／藍寶石', '鑽石／珍珠', '黑／白' ]
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} style={{margin: "3px"}}>
          {generation[i - 1]}
        </button>
      );
    }
    return <div>{buttons}</div>;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log('Input value:', e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Input value at search:', inputValue);
    const filtered = pokemonDetails.filter(pokemon =>
      pokemon.name?.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log('Filtered Pokemon:', filtered);
    setFilteredPokemonDetails(filtered);
  };

  const handleDetailClick = (pokemon) => {
    setSelectedPokemon(pokemon); // 設定被選中的寶可夢，打開Dialog顯示更多資訊
    // alert(`Details for ${pokemon.name}`);
  };

  const handleAddToListClick = (pokemon) => {
    addPokemon(pokemon);
    alert(`${pokemon.name} added to list`);
  };

  const handleCloseDialog = () => {
    setSelectedPokemon(null); // 關閉對話框
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
      <h1>Pokemon List</h1>
      <div>
        {renderPagination()}
        <input
          className='enter'
          type='text'
          placeholder='輸入名稱'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // 添加 onKeyDown 事件处理程序
        />
        <button onClick={handleSearch}>搜尋</button>
      </div>
      {filteredPokemonDetails.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className='pokemon-content'>
          {filteredPokemonDetails.map((pokemon) => (
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

        {/* <table>
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

      {/* 新增 PokemonDetailDialog */}
      {selectedPokemon && (
        <PokemonDetailDialog 
          pokemon={selectedPokemon} 
          onClose={handleCloseDialog} 
        />
      )}
    </div>
  );
};

export default PokemonList;

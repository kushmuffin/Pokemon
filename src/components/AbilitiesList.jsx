import React, { useEffect, useState } from 'react';
import { fetchAllAbilities } from './PokemonApi';
import { ability } from '../typeTranslations'; // 匯入翻譯檔

const Abilities = () => {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const getAbilities = async () => {
      const data = await fetchAllAbilities();
      setAbilities(data);
    };
    getAbilities();
  }, []);

  return (
    <div>
      <h1>寶可夢特性</h1>
      <table>
        <thead>
          <tr>
            <th>招式</th>
            <th>說明</th>
          </tr>
        </thead>
        <tbody>
          {abilities.map((abilityObj, index) => {
            const translatedName = ability[abilityObj.name] || abilityObj.name; // 使用翻譯檔翻譯名稱
            return (
              <tr key={index}>
                <td>{translatedName}</td>
                <td>{abilityObj.translatedEffect}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Abilities;

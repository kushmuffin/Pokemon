import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';
// 寶可夢
export const fetchPokemonList = async (limit = 649) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};

// 特性
export const fetchAllAbilities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ability?limit=1000`);
    const abilities = await Promise.all(
      response.data.results.map(async (ability) => {
        const abilityDetails = await axios.get(ability.url);

        // 先檢查 effect_entries 中的繁體中文翻譯
        const zhHantEffectEntry = abilityDetails.data.effect_entries.find(
          (entry) => entry.language.name === 'zh-Hant'
        );

        let translatedEffect = zhHantEffectEntry ? zhHantEffectEntry.effect : null;
        
        // 如果在 effect_entries 中找不到，則從 flavor_text_entries 中查找
        if (!translatedEffect) {
          const zhHantFlavorTextEntry = abilityDetails.data.flavor_text_entries.find(
            (entry) => entry.language.name === 'zh-Hant'
          );
          translatedEffect = zhHantFlavorTextEntry ? zhHantFlavorTextEntry.flavor_text : '無中文翻譯';
        }

        return {
          name: ability.name,
          translatedEffect,
        };
      })
    );
    return abilities;
  } catch (error) {
    console.error('Error fetching abilities:', error);
    return [];
  }
};


// 招式
export const fetchAllMove = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/move?limit=1000`);
    const moves = await Promise.all(
      response.data.results.map(async (move) => {
        const moveDetails = await axios.get(move.url);

        // 先檢查 effect_entries 中的繁體中文翻譯
        const zhHantEffectEntry = moveDetails.data.effect_entries.find(
          (entry) => entry.language.name === 'zh-Hant'
        );

        let translatedEffect = zhHantEffectEntry ? zhHantEffectEntry.effect : null;
        
        // 如果在 effect_entries 中找不到，則從 flavor_text_entries 中查找
        if (!translatedEffect) {
          const zhHantFlavorTextEntry = moveDetails.data.flavor_text_entries.find(
            (entry) => entry.language.name === 'zh-Hant'
          );
          translatedEffect = zhHantFlavorTextEntry ? zhHantFlavorTextEntry.flavor_text : '無中文翻譯';
        }

        return {
          name: move.name,
          translatedEffect,
        };
      })
    );
    return moves;
  } catch (error) {
    console.error('Error fetching moves:', error);
    return [];
  }
};
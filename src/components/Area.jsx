import React, { useState } from 'react';

import LPLE from '../assets/map/LPLE.png'
import HGSS from '../assets/map/HGSS.jpg'
import ORAS from '../assets/map/ORAS.png'
import BDSP from '../assets/map/BDSP.png'
import B2W2 from '../assets/map/B2W2.png'
import XY from '../assets/map/XY.png'
import USUM from '../assets/map/USUM.png'
import GR from '../assets/map/GR.png'
import SV from '../assets/map/SV.png'

const Area = () => {
  const [selectedMap, setSelectedMap] = useState(LPLE); // 用於儲存當前選中的地區圖片
  const [activeGen, setActiveGen] = useState(null); // 用於跟蹤當前激活的按鈕

  const handleButtonClick = (map, gen) => {
    setSelectedMap(map);
    setActiveGen(gen); // 設置當前選中的世代
  };

  const generations = {
    1: { map: '紅／綠-關都', image: LPLE },
    2: { map: '金／銀-城都', image: HGSS },
    3: { map: '紅寶石／藍寶石-豐緣', image: ORAS },
    4: { map: '鑽石／珍珠-神奧', image: BDSP },
    5: { map: '黑／白-合眾', image: B2W2 },
    6: { map: 'X／Y-卡洛斯', image: XY },
    7: { map: '太陽／月亮-阿羅拉', image: USUM },
    8: { map: '劍／盾-伽勒爾', image: GR },
    9: { map: '朱／紫-帕底亞', image: SV }
  };

  const renderPagination = () => {
    return Object.keys(generations).map((gen) => (
      <button
        key={gen}
        onClick={() => handleButtonClick(generations[gen].image, gen)}
        className={`gen-area-button ${activeGen === gen ? 'active' : ''}`} // 動態添加 active 類
      >
        {generations[gen].map}
      </button>
    ));
  };

  return (
    <div className='context'>
      <div className='grid-container'>{renderPagination()}</div>
      <hr />
      <div className='area-display'>
        {selectedMap ? (
          <img className='area-img' src={selectedMap} alt="選中的地區地圖" />
        ) : (
          <p>請選擇一個地區來顯示地圖</p>
        )}
      </div>
    </div>
  );
};

export default Area;

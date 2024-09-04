import React, { useState } from 'react';

import LPLE from '../assets/map/LPLE.png'
import HGSS from '../assets/map/HGSS.jpg'
import ORAS from '../assets/map/ORAS.png'
import BDSP from '../assets/map/BDSP.png'
import B2W2 from '../assets/map/B2W2.png'

const Area = () => {
  const [selectedMap, setSelectedMap] = useState(LPLE); // 用於儲存當前選中的地區圖片

  const handleButtonClick = (map) => {
    setSelectedMap(map); // 更新選中的圖片
  };

  return (
    <div className='context'>
      <div>
        <button onClick={() => handleButtonClick(LPLE)}>關都 (紅／綠)</button>
        <button onClick={() => handleButtonClick(HGSS)}>城都 (金／銀)</button>
        <button onClick={() => handleButtonClick(ORAS)}>豐緣 (紅寶石／藍寶石)</button>
        <button onClick={() => handleButtonClick(BDSP)}>神奧 (鑽石／珍珠)</button>
        <button onClick={() => handleButtonClick(B2W2)}>合眾 (黑／白)</button>
      </div>
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

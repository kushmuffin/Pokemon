import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale, // 註冊 radialLinear scale
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// 註冊需要的組件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ pokemonStats }) => {
  const data = {
    labels: ['生命值', '攻擊力', '防禦力', '特攻', '特防', '速度'],
    datasets: [
      {
        label: false,
        data: [
          pokemonStats.hp,
          pokemonStats.attack,
          pokemonStats.defense,
          pokemonStats.specialAttack,
          pokemonStats.specialDefense,
          pokemonStats.speed
        ],
        fill: true,
        backgroundColor: 'rgba(99, 144, 240, 0.5)',
        borderColor: 'rgb(99, 144, 240)',
        pointBackgroundColor: 'rgb(99, 144, 240)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 144, 240)'
      }
    ]
  };

  const options = {
    scales: {
      r: { // r 軸代表雷達圖的 radialLinear scale
        min: 0,   // 最小值
        max: 200, // 最大值
        pointLabels: {
          color: '#000', // 你也可以改變字體顏色
          font: {
            size: 24 // 設定字體大小為 16px
          }
        },
        ticks: {
          stepSize: 50 // 可選：設置刻度的步長
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    },
    plugins: {
      legend: {
        display: false // 隱藏圖例（label）
      }
    }
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;

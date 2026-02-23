import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProgressCircle = ({ currentProgress }) => {

  // 1. 数値のガード
  const rawProgress = isNaN(currentProgress) || currentProgress === undefined ? 0 : currentProgress;
  
  // 2. 小数第2位で「切り捨て」処理 (例: 99.999 -> 99.99)
  const displayProgress = Math.floor(rawProgress * 100) / 100;

  const pieData = [
    { value: displayProgress },
    { value: Math.max(0, 100 - displayProgress) }
  ];

  return (
    <div style={{ 
      background: '#111', color: '#fff', borderRadius: '12px', padding: '20px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' 
    }}>
      <div style={{ width: '100px', height: '100px', position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} innerRadius={35} outerRadius={45} stroke="none" dataKey="value" startAngle={90} endAngle={450}>
              {/* 100%になった時だけ色を変えるなど、達成感を最後にとっておく設定 */}
              <Cell fill={displayProgress >= 100 ? "#FFD700" : "#4CAF50"} />
              <Cell fill="#333" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          fontSize: '1.2rem', 
          fontWeight: '900' 
        }}>
          {/* 常に小数第2位まで表示 */}
          {displayProgress.toFixed(2)}%
        </div>
      </div>
      <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', color: '#888' }}>
        QUEST PROGRESS
      </div>
    </div>
  );
};

export default ProgressCircle;
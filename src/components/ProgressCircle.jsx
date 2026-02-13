import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProgressCircle = ({ currentProgress }) => {
  // データの形をここで定義（App.jsxをスッキリさせるため）
  const pieData = [
    { value: currentProgress },
    { value: Math.max(0, 100 - currentProgress) }
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
              <Cell fill={currentProgress >= 80 ? "#FFD700" : "#4CAF50"} />
              <Cell fill="#333" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          fontSize: '1.4rem', fontWeight: '900' 
        }}>
          {currentProgress}%
        </div>
      </div>
      <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', color: '#888' }}>
        QUEST PROGRESS
      </div>
    </div>
  );
};

export default ProgressCircle;
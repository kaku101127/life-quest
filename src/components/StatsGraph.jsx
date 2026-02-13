import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsGraph = ({ data }) => {
  const latestValue = data[data.length - 1]?.time || 0;
  const isGoalReached = latestValue >= 80;
  const themeColor = isGoalReached ? "#FFD700" : "#111";

  return (
    <div style={{ 
      background: '#fff', border: `3px solid ${themeColor}`, height: '420px', 
      borderRadius: '12px', padding: '30px 20px 10px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      position: 'relative', flex: 2, transition: 'all 0.4s ease'
    }}>
      <div style={{ position: 'absolute', top: '-15px', left: '30px', background: themeColor, color: isGoalReached ? '#000' : '#fff', padding: '5px 15px', fontSize: '0.75rem', fontWeight: '900', borderRadius: '4px' }}>
        WEEKLY ACTIVITY
      </div>
      <ResponsiveContainer width="100%" height="95%">
        {/* StatsGraph.jsx の Recharts部分を以下に書き換え */}

        <AreaChart data={data} margin={{ top: 10, right: -20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />

          {/* 左側のY軸：時間 (ID: left) */}
          <YAxis yAxisId="left" orientation="left" stroke="#111" tick={{fontSize: 10}} />
          
          {/* 右側のY軸：達成率 (ID: right) */}
          <YAxis yAxisId="right" orientation="right" stroke="#060606" domain={[0, 100]} tick={{fontSize: 10}} />

          <Tooltip />

          {/* 時間の折れ線（左軸を使用） */}
          {/* StatsGraph.jsx の Areaタグ部分 */}

          {/* 時間の線（左軸：timeを参照） */}
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="time"   // ここが utils.js の time と一致している必要があります
            stroke="#111" 
            strokeWidth={4} 
            fill="rgba(0,0,0,0.05)" 
            isAnimationActive={false} // デバッグ中なので一旦アニメオフ
          />

          {/* 達成率の線（右軸：progressを参照） */}
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="progress" // ここが utils.js の progress と一致している必要があります
            stroke="#FFD700" 
            strokeWidth={3} 
            fill="transparent"
            strokeDasharray="5 5"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsGraph;
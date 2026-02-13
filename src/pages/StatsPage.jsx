import React from 'react';
import StatsGraph from '../components/StatsGraph';
import TargetTabs from '../components/TargetTabs';
import ProgressCircle from '../components/ProgressCircle';
import CalendarHeatmap from 'react-calendar-heatmap'; 
import 'react-calendar-heatmap/dist/styles.css'; 
import ActivityHeatmap from '../components/ActivityHeatmap';
import StatsSummary from '../components/StatsSummary';

// ダミーデータ（本来はログから生成します）
const heatmapValues = [
  { date: '2026-02-01', count: 1 },
  { date: '2026-02-02', count: 3 },
  { date: '2026-02-05', count: 2 },
  { date: '2026-02-13', count: 4 }, // 今日
];


const StatsPage = ({ 
  questTitle, 
  statsData, 
  currentProgress, 
  totalTime = 123.5, 
  streak = 12, 
  sessions = 48, 
  heatmapData,
  onUpdate, 
  onBack }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px 20px', fontFamily: '"Arial Black", sans-serif', color: '#111' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 戻るボタン */}
        <button 
          onClick={onBack} 
          style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: 'none', background: '#ddd' }}
        >
          ← Back to Dashboard
        </button>


        <header style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#111', color: '#fff', padding: '25px 40px', borderRadius: '12px',
          marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#FFD700', letterSpacing: '2px', marginBottom: '5px' }}>CURRENT QUEST</div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', textTransform: 'uppercase', lineHeight: '1' }}>
              {questTitle}
            </h1>
          </div>
        </header>

        {/* 1. サマリー (切り出した部品) */}
        <StatsSummary totalTime={totalTime} streak={streak} sessions={sessions} />

        {/* --- メインコンテンツ（2カラム） --- */}
        {/* --- 修正後：左にグラフ、右に「円グラフ＋タブ」の束を作る --- */}
        <div style={{ display: 'flex', gap: '25px', marginBottom: '30px', alignItems: 'flex-start' }}>
            
            {/* 左側：折れ線グラフ */}
          <StatsGraph data={statsData} />

            {/* 右側：ここを div で囲って縦に並べる */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '300px' }}>
            <ProgressCircle currentProgress={currentProgress} />

            {/* ターゲットタブ */}
            <TargetTabs onUpdate={onUpdate} />
          </div>
        </div>

        {/* 3. ヒートマップ (切り出した部品) */}
        <ActivityHeatmap data={heatmapValues} />


      </div>
    </div>
  );
};

export default StatsPage;



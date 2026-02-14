import React from 'react';
import StatsGraph from '../components/StatsGraph';
import TargetTabs from '../components/TargetTabs';
import ProgressCircle from '../components/ProgressCircle';
import 'react-calendar-heatmap/dist/styles.css'; 
import ActivityHeatmap from '../components/ActivityHeatmap';
import StatsSummary from '../components/StatsSummary';

// ヒートマップ用のダミーデータ（既存）
const heatmapValues = [
  { date: '2026-02-01', count: 1 },
  { date: '2026-02-02', count: 3 },
  { date: '2026-02-05', count: 2 },
  { date: '2026-02-13', count: 4 }, 
];

const StatsPage = ({ 
  questTitle, 
  statsData, 
  currentProgress, 
  totalTime = 123.5, 
  streak = 12, 
  sessions = 48, 
  onUpdate, 
  onBack,
  // --- [NEW] App.jsxから渡される履歴データ ---
  history = [] 
}) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px 20px', fontFamily: '"Arial Black", sans-serif', color: '#111' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* --- 1. Navigation Section: 戻るボタン --- */}
        <button 
          onClick={onBack} 
          style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: 'none', background: '#ddd', fontWeight: 'bold' }}
        >
          ← BACK TO DASHBOARD
        </button>

        {/* --- 2. Header Section: クエストタイトル --- */}
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

        {/* --- 3. Summary Section: 実績合計・継続日数など --- */}
        <StatsSummary totalTime={totalTime} streak={streak} sessions={sessions} />

        {/* --- 4. Main Charts Section: グラフと進捗状況 --- */}
        <div style={{ display: 'flex', gap: '25px', marginBottom: '30px', alignItems: 'flex-start' }}>
          {/* 左カラム：折れ線グラフ */}
          <StatsGraph data={statsData} />

          {/* 右カラム：進捗円グラフ ＆ タブ操作 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '300px' }}>
            <ProgressCircle currentProgress={currentProgress} />
            <TargetTabs onUpdate={onUpdate} />
          </div>
        </div>

        {/* --- 5. Activity Heatmap: カレンダー表示 --- */}
        <ActivityHeatmap data={heatmapValues} />

        {/* --- 6. [NEW] Activity Log Section: タイムライン形式の履歴 --- */}
        <section style={{ marginTop: '40px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '4px solid #111', display: 'inline-block' }}>
            ACTIVITY HISTORY
          </h2>
          
          {history.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>No session logs available yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* 最新のログが一番上にくるように reverse して表示 */}
              {[...history].reverse().map((log) => (
                <div key={log.id} style={{ border: '2px solid #f0f0f0', padding: '20px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      {/* 記録日時 */}
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>
                        {new Date(log.date).toLocaleString('en-US')}
                      </div>
                      {/* 作業時間や回数の表示 */}
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {log.minutes} MINS FOCUSED
                        {log.count > 0 && ` / ${log.count} TIMES`}
                      </div>
                    </div>
                    {/* 数値指標（体重やスコア）があればバッジ表示 */}
                    {log.metric && (
                      <span style={{ background: '#111', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>
                        {log.metric}
                      </span>
                    )}
                  </div>
                  
                  {/* メモ内容 */}
                  {log.note && (
                    <div style={{ fontSize: '0.9rem', color: '#444', background: '#f9f9f9', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #ddd' }}>
                      {log.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default StatsPage;
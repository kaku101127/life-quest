import React from 'react';
import StatsHeader from '../components/stats/StatsHeader';
import StatsSummary from '../components/stats/StatsSummary';
import StatsGraph from '../components/stats/StatsGraph';
import ProgressCircle from '../components/stats/ProgressCircle';
import TargetTabs from '../components/stats/TargetTabs';
import ActivityHeatmap from '../components/stats/ActivityHeatmap';
import ActivityHistoryList from '../components/stats/ActivityHistoryList';

const StatsPage = ({ 
  questTitle, 
  statsData, 
  currentProgress, // 現在の実数値
  mainGoal,        // 目標数値
  totalTime = 0, 
  streak = 1, 
  onUpdateSubTarget, 
  onBack, 
  history = [], 
  subTargets = [] 
}) => {

  // --- 進捗パーセンテージの計算 (NaN対策) ---
  const current = Number(currentProgress) || 0;
  const goal = Number(mainGoal) || 1; // 0除算を防ぐため最小1
  const progressPercent = Math.min(Math.round((current / goal) * 100), 100);

  // ヒートマップ用データ
  const heatmapValues = history.map(log => ({
    date: log.date.split('T')[0],
    count: 1
  }));

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px 20px', fontFamily: '"Arial Black", sans-serif', color: '#111' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 1. ヘッダー */}
        <StatsHeader title={questTitle} onBack={onBack} />

        {/* 2. サマリー数値 */}
        <StatsSummary totalTime={totalTime} streak={streak} sessions={history.length} />

        {/* 3. メインビジュアル（グラフ & 進捗） */}
        <div style={{ display: 'flex', gap: '25px', marginBottom: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <StatsGraph data={statsData} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '300px' }}>
            
            {/* 計算した progressPercent を渡すことでバーが動く */}
            <ProgressCircle currentProgress={progressPercent} />
            
            <TargetTabs 
              subTargets={subTargets} 
              onUpdateSubTarget={onUpdateSubTarget} 
            />
          </div>
        </div>

        {/* 4. ヒートマップ */}
        <ActivityHeatmap data={heatmapValues} />

        {/* 5. 履歴リスト */}
        <ActivityHistoryList history={history} />

      </div>
    </div>
  );
};

export default StatsPage;
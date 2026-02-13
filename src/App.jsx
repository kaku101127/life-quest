import React, { useState } from 'react';
import { generateHistoryData } from './utils/utils';
import TopPage from './pages/TopPage';
import StatsPage from './pages/StatsPage'; 
import FocusPage from './pages/FocusPage';

function App() {
  // 1. クエストのリストを state で管理する（これで追加したものを覚えておける）
  const [projects, setProjects] = useState([
    { name: 'English Study', target: 100, totalMins: 0, color: '#2563eb' }
  ]);
  
  const [selectedQuestName, setSelectedQuestName] = useState('English Study');
  const [statsData, setStatsData] = useState(generateHistoryData(7));
  const [viewMode, setViewMode] = useState('top');

  // 2. クエストを追加する関数（TopPageに渡す）
  const handleAddQuest = (newQuest) => {
    const fullQuest = {
      ...newQuest,
      totalMins: 0,
      color: '#' + Math.floor(Math.random()*16777215).toString(16) // ランダムな色を生成
    };
    // 今あるリストの最後に新しいクエストをくっつける
    setProjects([...projects, fullQuest]);
  };
  
  const handleUpdate = (amount) => {
    setStatsData(prev => {
      const newData = [...prev];
      const todayIdx = newData.length - 1;
      // 既存の値を強制的に数字にする
      const currentVal = parseFloat(newData[todayIdx].time) || 0;
      const nextVal = currentVal + amount;
      
      newData[todayIdx] = { 
        ...newData[todayIdx], 
        time: nextVal,
        progress: Math.min(nextVal, 100)
      };
      return newData;
    });
  };

  const handleStartFocus = (title) => {
    setSelectedQuestName(title);
    setViewMode('focus');
  };
  
  const handleStartQuest = (title) => {
    setSelectedQuestName(title);
    setViewMode('stats');
  };

  const handleFinishFocus = (minutes) => {
    // 指定されたクエストの時間を更新する
    setProjects(prev => prev.map(p => 
      p.name === selectedQuestName 
        ? { ...p, totalMins: p.totalMins + minutes } 
        : p
    ));
    setViewMode('top'); // 終わったらトップに戻る
  };

  // --- 画面の出し分け ---
  // 1. トップページ
  if (viewMode === 'top') {
    return (
      <TopPage 
        projects={projects} 
        onStartQuest={handleStartQuest} 
        onAdd={handleAddQuest} 
        onStartFocus={handleStartFocus} 
      />
    );
  }

  // 2. フォーカス（計測）ページ
  if (viewMode === 'focus') {
    return (
      <FocusPage 
        questName={selectedQuestName}
        onFinish={handleFinishFocus}
        onCancel={() => setViewMode('top')}
      />
    );
  }

  // 3. グラフページ（どれにも当てはまらない場合、つまり viewMode === 'stats' の時）
  return (
    <StatsPage 
      questTitle={selectedQuestName}
      statsData={statsData}
      currentProgress={
        statsData[statsData.length - 1].progress !== undefined 
        ? statsData[statsData.length - 1].progress 
        : Math.min(statsData[statsData.length - 1].time, 100) // timeから計算
      }
      onUpdate={handleUpdate}
      onBack={() => setViewMode('top')}
    />
  );
}

export default App;
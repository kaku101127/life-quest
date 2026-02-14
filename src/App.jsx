import React, { useState } from 'react';
import { generateHistoryData } from './utils/utils';
import TopPage from './pages/TopPage';
import StatsPage from './pages/StatsPage'; 
import FocusPage from './pages/FocusPage';

function App() {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'English Study', 
      // ... (other properties)
      history: [] // --- [DATA SECTION] ここに過去の全ログが蓄積されます ---
    }
  ]);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedQuestName, setSelectedQuestName] = useState(''); 
  const [statsData, setStatsData] = useState(generateHistoryData(7));
  const [viewMode, setViewMode] = useState('top');

  // --- Handlers (Logic) ---

  // クエスト追加
  const handleAddQuest = (newQuestData) => {
    const fullQuest = {
      ...newQuestData,
      id: Date.now(),
      totalMins: 0,
      currentProgress: 0,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };
    setProjects([...projects, fullQuest]);
  };
  
  // 統計データの更新
  const handleUpdateStats = (amount) => {
    setStatsData(prev => {
      const newData = [...prev];
      const todayIdx = newData.length - 1;
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

  // フォーカス開始
  const handleStartFocus = (project) => {
    setSelectedProject(project);
    setSelectedQuestName(project.name); 
    setViewMode('focus');
  };
  
  // 統計画面への遷移
  // --- 修正箇所A: handleViewStats を ID で受けるように変更 ---
  const handleViewStats = (id) => {
    const target = projects.find(p => p.id === id);
    if (target) {
      setSelectedProject(target);      // オブジェクトごと保存
      setSelectedQuestName(target.name); // 表示用タイトル
      setViewMode('stats');
    }
  };

  // フォーカス終了とデータ保存
  // --- [LOGIC SECTION] フォーカス終了時のデータ処理 ---
  const handleFinishFocus = (result) => {
    setProjects(prevProjects => prevProjects.map(p => {
      if (p.id === result.questId) {
        
        // 1. 小目標の完了状態を更新
        const updatedSubTargets = p.subTargets.map(st => {
          if (result.completedSubIds.includes(st.id)) {
            return { ...st, completed: true };
          }
          return st;
        });

        // 2. 今回のセッション内容を「履歴」としてパッケージ化
        const newLog = {
          id: Date.now(),
          date: result.timestamp,      // 実施日時
          minutes: result.minutes,     // 集中した時間
          count: result.count,         // 実施回数
          metric: result.trackingValue,// 体重やスコアなどの数値
          note: result.note,           // メモ
          achievedSubs: result.completedSubIds // 今回達成した小目標のIDリスト
        };

        // 3. 進捗の計算（時間または回数を現在の進捗に加算）
        const progressIncrement = (p.unit === 'Hours' || p.unit === '時間') 
          ? result.minutes / 60 
          : result.count;

        // --- [STATE UPDATE] プロジェクト情報を更新して履歴を追加 ---
        return {
          ...p,
          currentProgress: (p.currentProgress || 0) + progressIncrement,
          totalMins: (p.totalMins || 0) + result.minutes,
          subTargets: updatedSubTargets,
          history: [...(p.history || []), newLog] // 既存の履歴に新しいログを合体
        };
      }
      return p;
    }));

    setViewMode('top');
  };

  // --- Render Logic (UI Display) ---
  // ページごとにレンダリング関数を分けることで、App.jsxの可読性を高めます
  const renderContent = () => {
    switch (viewMode) {
      case 'focus':
        return (
          <FocusPage 
            project={selectedProject} 
            onFinish={handleFinishFocus}
            onCancel={() => setViewMode('top')}
          />
        );
      // --- 修正箇所B: renderContent の stats ケース ---
      case 'stats':
        // selectedProject.id を使って、最新の projects ステートからデータを探す
        const currentProj = projects.find(p => p.id === selectedProject?.id);

        return (
          <StatsPage 
            questTitle={selectedQuestName}
            statsData={statsData}
            // 最新の history を確実に渡す
            history={currentProj ? currentProj.history : []} 
            currentProgress={
              statsData[statsData.length - 1].progress !== undefined 
              ? statsData[statsData.length - 1].progress 
              : Math.min(statsData[statsData.length - 1].time, 100)
            }
            onUpdate={handleUpdateStats}
            onBack={() => setViewMode('top')}
          />
        );
      default:
        return (
          <TopPage 
            projects={projects} 
            onStartFocus={handleStartFocus}
            onStartQuest={handleViewStats} 
            onAdd={handleAddQuest} 
          />
        );
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
    </div>
  );
}

export default App;
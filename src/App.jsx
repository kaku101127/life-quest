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
      target: 100,
      unit: 'Hours',
      mainGoal: 'Daily Conversation',
      subTargets: [
        { id: 101, text: 'Read 10 pages', type: 'count', goal: 10, current: 0, completed: false },
        { id: 102, text: 'Memo 5 words', type: 'check', completed: false }
      ],
      history: [] 
    }
  ]);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedQuestName, setSelectedQuestName] = useState(''); 
  const [statsData, setStatsData] = useState(generateHistoryData(7));
  const [viewMode, setViewMode] = useState('top');

  // --- Handlers (Logic) ---

  const handleAddQuest = (newQuestData) => {
    const fullQuest = {
      ...newQuestData,
      id: Date.now(),
      totalMins: 0,
      currentProgress: 0,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      history: []
    };
    setProjects([...projects, fullQuest]);
  };
  
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

  const handleStartFocus = (project) => {
    setSelectedProject(project);
    setSelectedQuestName(project.name); 
    setViewMode('focus');
  };
  
  const handleViewStats = (id) => {
    const target = projects.find(p => p.id === id);
    if (target) {
      setSelectedProject(target);
      setSelectedQuestName(target.name);
      setViewMode('stats');
    }
  };

  // --- [LOGIC SECTION] フォーカス終了時のデータ処理（ここを改良） ---
  const handleFinishFocus = (result) => {
    setProjects(prevProjects => prevProjects.map(p => {
      if (p.id === result.questId) {
        
        // 1. 小目標の更新 (数値の現在地と完了状態の両方を反映)
        const updatedSubTargets = p.subTargets.map(st => {
          // ResultViewから送られてきた「この小目標の最新状態」を探す
          const update = result.subTargetUpdates?.find(u => u.id === st.id);
          
          return { 
            ...st, 
            // 完了チェックが入っている、もしくは今回の更新でゴールに達していれば完了(true)
            completed: result.completedSubIds.includes(st.id) || (update && update.current >= st.goal),
            // 新しい数値があれば上書き、なければ今のまま
            current: update ? update.current : (st.current || 0)
          };
        });

        // 2. 履歴（ログ）の作成
        const newLog = {
          id: Date.now(),
          date: result.timestamp,
          minutes: result.minutes,      // タイマーまたは手入力の分
          count: result.count,          // セッション回数
          note: result.note,            // 最終的なメモ
          achievedSubs: result.completedSubIds // 今回チェックを入れたID
        };

        // 3. 全体進捗の計算
        // 時間単位のクエストなら「分を時間に変換」して加算、それ以外は「回数」を加算
        const progressIncrement = (p.unit === 'Hours' || p.unit === '時間') 
          ? result.minutes / 60 
          : result.count;

        return {
          ...p,
          currentProgress: (p.currentProgress || 0) + progressIncrement,
          totalMins: (p.totalMins || 0) + result.minutes,
          subTargets: updatedSubTargets, // 改良された小目標リスト
          history: [...(p.history || []), newLog]
        };
      }
      return p;
    }));

    setViewMode('top');
  };

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
      case 'stats':
        const currentProj = projects.find(p => p.id === selectedProject?.id);
        return (
          <StatsPage 
            questTitle={selectedQuestName}
            statsData={statsData}
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
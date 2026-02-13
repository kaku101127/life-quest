import React from 'react';
import QuestCard from '../components/QuestCard';
import AddQuestForm from '../components/AddQuestForm';

// ★修正ポイント：引数に「onStartFocus」を追加しました
const TopPage = ({ projects, onStartQuest, onAdd, onStartFocus }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* ヘッダー部分 */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#1e293b' }}>2026 Life Quests</h1>
      </div>

      {/* 追加フォーム */}
      <AddQuestForm onAdd={onAdd} />

      {/* グリッドレイアウト */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {projects.map((p, index) => (
          <QuestCard 
            key={index} 
            project={p} 
            onStatsClick={onStartQuest} 
            onFocusClick={onStartFocus} 
          />
        ))}
      </div>
    </div>
  );
};

export default TopPage;
import React, { useState } from 'react'; // ★ useStateを追加
import QuestCard from '../components/QuestCard';
import AddQuestModal from '../components/AddQuestModal';

const TopPage = ({ projects, onStartQuest, onAdd, onStartFocus }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* ヘッダー部分 */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#1e293b', margin: 0 }}>2026 Life Quests</h1>
        
        {/* ★ モーダルを開くためのボタンを設置 */}
        <button 
          onClick={() => setShowModal(true)}
          style={{ 
            padding: '10px 20px', 
            background: '#111', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + NEW QUEST
        </button>
      </div>

      {/* グリッドレイアウト */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {projects.map((p, index) => (
          <QuestCard 
            key={p.id || index} // idがあればそれを使う
            project={p} 
            onStatsClick={onStartQuest} 
            onFocusClick={onStartFocus} 
          />
        ))}
      </div>

      {/* ★ モーダル本体の呼び出し */}
      {showModal && (
        <AddQuestModal 
          onAdd={(newQuest) => {
            onAdd(newQuest);
            setShowModal(false);
          }} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default TopPage;
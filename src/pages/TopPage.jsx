import React, { useState } from 'react';
import QuestCard from '../components/top/QuestCard';
import AddQuestModal from '../components/top/AddQuestModal';

const TopPage = ({ projects = [], onStartQuest, onAdd, onStartFocus }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc', // StatsPageと合わせた薄いグレー
      padding: '40px 20px', 
      fontFamily: '"Arial Black", sans-serif' // 力強いフォント
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* ヘッダーエリア */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px',
          borderBottom: '4px solid #111',
          paddingBottom: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '2px' }}>DASHBOARD</div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', textTransform: 'uppercase', color: '#111' }}>
              2026 Life Quests
            </h1>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            style={{ 
              padding: '12px 24px', 
              background: '#111', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 0 #444', // 立体感のあるボタン
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            + NEW QUEST
          </button>
        </div>

        {/* メイングリッド */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', // ここを260に！
          gap: '15px' 
        }}>
          {projects && projects.length > 0 ? (
            projects.map((p, index) => (
              <QuestCard 
                key={p.id || index} 
                project={p} 
                onStatsClick={onStartQuest} 
                onFocusClick={onStartFocus} 
              />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '80px 20px', 
              background: '#fff', 
              borderRadius: '16px', 
              border: '2px dashed #cbd5e1' 
            }}>
              <p style={{ color: '#64748b', fontSize: '1.2rem', margin: 0 }}>
                NO ACTIVE QUESTS FOUND.<br/>
                READY TO START YOUR MISSION?
              </p>
            </div>
          )}
        </div>

        {/* クエスト追加モーダル */}
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
    </div>
  );
};

export default TopPage;
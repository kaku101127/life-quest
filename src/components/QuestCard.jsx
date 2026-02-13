import React from 'react';

const QuestCard = ({ project, onStatsClick, onFocusClick }) => {
    // 本物のデータから計算する
  const targetMins = (project.target || 0) * 60;
  const progress = targetMins > 0 
    ? Math.min((project.totalMins / targetMins) * 100, 100) 
    : 0;

  return (
    <div style={{
      background: '#fff', padding: '1.2rem', borderRadius: '24px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
      borderTop: `6px solid ${project.color || '#2563eb'}`,
    }}>
      <div style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '10px' }}>
        {project.name}
      </div>
      
      <div style={{ fontSize: '1.4rem', fontWeight: '700', color: project.color || '#2563eb', marginBottom: '10px' }}>
        {Math.floor((project.totalMins || 0) / 60)}h {(project.totalMins || 0) % 60}m
      </div>

      {/* プログレスバー */}
      <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '999px', height: '10px', overflow: 'hidden', marginBottom: '15px' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: project.color || '#2563eb', transition: '0.5s' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onFocusClick(project.name)} // ★ここを繋ぐ！
        style={{ flex: 1, padding: '10px', borderRadius: '14px', border: 'none', background: '#f1f5f9', fontWeight: '700' }}>Focus</button>
        <button 
          onClick={() => onStatsClick(project.name)}
          style={{ flex: 1, padding: '10px', borderRadius: '14px', border: 'none', background: '#e2e8f0', color: '#1e293b', fontWeight: '700', cursor: 'pointer' }}
        >
          Stats
        </button>
      </div>
    </div>
  );
};

export default QuestCard;
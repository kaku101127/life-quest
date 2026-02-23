import React from 'react';

const QuestCard = ({ project, onStatsClick, onFocusClick }) => {
  // --- 残り日数の計算 ---
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = getDaysLeft(project.deadline);

  // --- NaN 対策を施した進捗計算 ---
  const current = Number(project.currentProgress) || 0; // 数値化し、ダメなら0
  const goal = Number(project.mainGoal) || 1;          // 0で割るのを防ぐため最小1
  const progressPercent = Math.min(Math.round((current / goal) * 100), 100);

  return (
    <div style={{ 
      background: '#fff', border: '3px solid #111', borderRadius: '12px', padding: '15px', // パディングを少し絞ってコンパクトに
      boxShadow: '6px 6px 0px #eee', display: 'flex', flexDirection: 'column', gap: '8px'
    }}>
      {/* 1. ヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase', lineHeight: '1.2' }}>
          {project.name}
        </h3>
        {daysLeft !== null && (
          <span style={{ background: '#ff4757', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {daysLeft}D LEFT
          </span>
        )}
      </div>

      {/* 2. メイン目標の説明 */}
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', fontWeight: 'bold' }}>
        {current.toFixed(1)} / {goal} {project.unit}
      </p>

      {/* 3. 進捗バー (NaN%にならない安全設計) */}
      <div style={{ background: '#eee', height: '10px', borderRadius: '5px', overflow: 'hidden', margin: '2px 0' }}>
        <div style={{ 
          width: `${progressPercent}%`, 
          height: '100%', 
          background: '#111',
          transition: 'width 0.5s ease-out'
        }} />
      </div>
      <div style={{ fontSize: '0.7rem', textAlign: 'right', fontWeight: 'bold' }}>
        {progressPercent}% COMPLETE
      </div>

      {/* 4. 小目標のチラ見せ */}
      {project.subTargets?.length > 0 && (
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '8px', marginTop: '2px' }}>
          {project.subTargets.slice(0, 2).map(st => (
            <div key={st.id} style={{ fontSize: '0.7rem', color: st.completed ? '#ccc' : '#111', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
              <span>{st.completed ? '☑' : '☐'}</span>
              <span style={{ textDecoration: st.completed ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {st.name || st.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 5. アクションボタン */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px' }}>
        <button onClick={() => onFocusClick(project)} style={{ 
          flex: 1, padding: '8px 0', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' 
        }}>FOCUS</button>
        <button onClick={() => onStatsClick(project.id)} style={{ 
          flex: 1, padding: '8px 0', background: '#fff', border: '2px solid #111', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' 
        }}>STATS</button>
      </div>
    </div>
  );
};

export default QuestCard;
import React from 'react';

const QuestCard = ({ project, onStatsClick, onFocusClick }) => {
  // --- 追加：期限までの残り日数を計算 ---
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = getDaysLeft(project.deadline);

  return (
    <div style={{ 
      background: '#fff', border: '3px solid #111', borderRadius: '12px', padding: '20px',
      boxShadow: '8px 8px 0px #eee', position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px'
    }}>
      {/* 1. ヘッダー：名前と期限 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem', textTransform: 'uppercase' }}>{project.name}</h3>
        {daysLeft !== null && (
          <span style={{ background: '#ff4757', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {daysLeft} DAYS LEFT
          </span>
        )}
      </div>

      {/* 2. メイン目標の説明 */}
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', fontWeight: 'bold' }}>
        TARGET: {project.target}{project.unit} / {project.mainGoal}
      </p>

      {/* 3. 進捗バー（既存のものを活用） */}
      <div style={{ background: '#eee', height: '10px', borderRadius: '5px', overflow: 'hidden', margin: '5px 0' }}>
        <div style={{ 
          width: `${Math.min((project.totalMins / (project.target * 60)) * 100, 100)}%`, // 時間で計算する場合
          height: '100%', background: project.color || '#111' 
        }} />
      </div>

      {/* 4. 小目標（SubTargets）のチラ見せ */}
      {project.subTargets && project.subTargets.length > 0 && (
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '10px', marginTop: '5px' }}>
          <p style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '5px', textTransform: 'uppercase' }}>Sub Targets</p>
          {project.subTargets.slice(0, 2).map(st => ( // 最初の2つだけ表示
            <div key={st.id} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
              <input type="checkbox" checked={st.completed} readOnly style={{ accentColor: '#111' }} />
              <span style={{ textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? '#ccc' : '#111' }}>
                {st.text} {st.type === 'count' ? `(${st.current}/${st.goal}${st.unit})` : ''}
              </span>
            </div>
          ))}
          {project.subTargets.length > 2 && <span style={{ fontSize: '0.7rem', color: '#aaa' }}>...and {project.subTargets.length - 2} more</span>}
        </div>
      )}

      {/* 5. アクションボタン */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
        
        {/* --- FOCUSボタンの修正：project.name ではなく project を丸ごと渡す --- */}
        <button onClick={() => onFocusClick(project)} style={{ 
          flex: 1, 
          padding: '8px', 
          background: '#111',  
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer', 
          fontWeight: 'bold' }}>FOCUS</button>

        {/* --- STATSボタンの修正：project.name ではなく project.id を渡す --- */}
        <button onClick={() => onStatsClick(project.id)} style={{ 
          flex: 1, padding: '8px',
           background: '#fff', 
           border: '2px solid #111',
           borderRadius: '6px', 
           cursor: 'pointer', 
           fontWeight: 'bold' }}>STATS</button>

      </div>
    </div>
  );
};

export default QuestCard;
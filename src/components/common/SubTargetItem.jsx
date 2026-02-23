import React from 'react';

const SubTargetItem = ({ st, mode = 'view', onAction }) => {
  // st: サブターゲットオブジェクト
  // mode: 'manage' (修行中の編集), 'check' (結果画面の完了確認), 'view' (表示のみ)

  const isDark = true; // フォーカス画面はダーク系なので
  const label = st.name || st.text;

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px',
      background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(0,255,255,0.1)'
    }}>
      <span style={{ flex: 1, fontSize: '0.9rem', color: st.completed ? '#666' : '#fff' }}>
        {label} {st.type === 'count' && `(${st.current}/${st.goal})`}
      </span>

      {/* モード別のボタン操作 */}
      {mode === 'manage' && (
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={() => onAction('moveUp', st.id)} style={smallBtn}>▲</button>
          <button onClick={() => onAction('delete', st.id)} style={{...smallBtn, color: '#ff4757'}}>✕</button>
        </div>
      )}

      {mode === 'check' && (
        <input 
          type="checkbox" 
          checked={st.completed} 
          onChange={() => onAction('toggle', st.id)}
          style={{ width: '18px', height: '18px', accentColor: '#00ffff' }}
        />
      )}
    </div>
  );
};

const smallBtn = { background: 'none', border: 'none', color: '#00ffff', cursor: 'pointer', fontSize: '0.7rem' };

export default SubTargetItem;
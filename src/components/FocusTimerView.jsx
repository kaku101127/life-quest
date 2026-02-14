import React, { useState } from 'react';

// --- [COMPONENT] FocusTimerView ---
const FocusTimerView = ({ 
  project, 
  seconds, 
  formatTime, 
  isActive, 
  setIsActive, 
  onShowResult, 
  onCancel,
  // --- [NEW] 親からメモの状態を受け取る ---
  interimNote,
  setInterimNote
}) => {
  // 今回のフォーカスで狙うターゲット（小目標）を管理
  const [activeTargetId, setActiveTargetId] = useState(null);

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      
      {/* --- Section 1: Top Status Bar --- */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Mission: {project.name}
        </h2>
      </div>

      {/* --- Section 2: Main Timer Display --- */}
      <div style={{ fontSize: '6rem', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'monospace', color: isActive ? '#fff' : '#64748b' }}>
        {formatTime(seconds)}
      </div>

      {/* --- Section 3: Active Target Selection --- */}
      {/* 修行中に「今どれをやっているか」を意識させるセクション */}
      <div style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' }}>Focus Target</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {project.subTargets?.map(st => (
            <button
              key={st.id}
              onClick={() => setActiveTargetId(st.id)}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none',
                background: activeTargetId === st.id ? '#3b82f6' : '#1e293b',
                color: activeTargetId === st.id ? '#fff' : '#94a3b8',
                cursor: 'pointer', fontSize: '0.85rem', transition: '0.3s'
              }}
            >
              {st.text}
            </button>
          ))}
        </div>
      </div>

      {/* --- Section 4: Live Memo Input --- */}
      {/* 修行中にふと思いついたことを即座にメモ。リザルト画面に自動で引き継がれます */}
      <div style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Live Session Memo</label>
        <textarea 
          value={interimNote}
          onChange={(e) => setInterimNote(e.target.value)}
          placeholder="Type your insights here during focus..."
          style={{ 
            width: '100%', padding: '15px', borderRadius: '12px', background: '#1e293b', 
            border: '1px solid #334155', color: '#fff', fontSize: '0.9rem', resize: 'none' 
          }}
          rows="2"
        />
      </div>

      {/* --- Section 5: Control Buttons --- */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setIsActive(!isActive)}
          style={{ 
            padding: '15px 40px', borderRadius: '12px', border: 'none', 
            background: isActive ? '#f59e0b' : '#22c55e', 
            color: 'white', fontWeight: 'bold', cursor: 'pointer', minWidth: '140px' 
          }}
        >
          {isActive ? 'PAUSE' : 'RESUME'}
        </button>
        
        <button 
          onClick={onShowResult}
          style={{ 
            padding: '15px 40px', borderRadius: '12px', border: 'none', 
            background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' 
          }}
        >
          FINISH SESSION
        </button>
      </div>

      <button 
        onClick={onCancel}
        style={{ marginTop: '30px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', textDecoration: 'underline' }}
      >
        Discard Session
      </button>
    </div>
  );
};

export default FocusTimerView;
import React, { useState } from 'react';

// --- [COMPONENT] FocusResultView ---
// initialNote: FocusPageから引き継いだ中間メモ
const FocusResultView = ({ project, seconds, formatTime, onSave, initialNote = "" }) => {
  
  // --- [STATE] リザルト入力項目 ---
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSubIds, setCompletedSubIds] = useState([]);
  const [trackingValue, setTrackingValue] = useState('');
  
  // ★重要: useStateの初期値に initialNote をセットすることで、修行中のメモが表示されます
  const [note, setNote] = useState(initialNote);

  // 小目標のトグル処理
  const toggleSubTarget = (id) => {
    setCompletedSubIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- [LOGIC] 保存実行 ---
  const handleSave = () => {
    onSave({
      count: Number(sessionCount),
      completedSubIds: completedSubIds,
      trackingValue: trackingValue,
      note: note // 編集された（あるいは引き継がれたままの）メモを保存
    });
  };

  return (
    <div style={{ padding: '40px 20px', background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* --- Header: セッション要約 --- */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.8rem' }}>Session Summary</h2>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>MISSION COMPLETE</h1>
          <p style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: 'bold' }}>
            TOTAL TIME: {formatTime(seconds)}
          </p>
        </header>

        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* --- Section 1: Session Count (If applicable) --- */}
          {(project.unit === 'Times' || project.unit === '回') && (
            <section>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>SESSIONS COMPLETED</label>
              <input 
                type="number" 
                value={sessionCount} 
                onChange={(e) => setSessionCount(e.target.value)}
                style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', fontSize: '1.2rem' }}
              />
            </section>
          )}

          {/* --- Section 2: Sub-Target Checklist --- */}
          {project.subTargets?.length > 0 && (
            <section>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 'bold' }}>ACHIEVED SUB-TARGETS</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.subTargets.map(st => (
                  <div 
                    key={st.id} 
                    onClick={() => toggleSubTarget(st.id)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', 
                      background: completedSubIds.includes(st.id) ? '#3b82f6' : '#0f172a',
                      borderRadius: '10px', cursor: 'pointer', transition: '0.2s'
                    }}
                  >
                    <input type="checkbox" checked={completedSubIds.includes(st.id)} readOnly />
                    <span>{st.text}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- Section 3: Final Memo (修行中のメモがここに初期表示されます) --- */}
          <section>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>SESSION NOTES / INSIGHTS</label>
            <textarea 
              rows="4"
              value={note} 
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', resize: 'none' }}
              placeholder="Add your final thoughts here..."
            />
          </section>

          {/* --- Action Button --- */}
          <button 
            onClick={handleSave}
            style={{ width: '100%', padding: '20px', borderRadius: '12px', border: 'none', background: '#22c55e', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            CONFIRM & SAVE DATA
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusResultView;
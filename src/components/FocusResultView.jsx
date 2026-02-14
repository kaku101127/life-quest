import React, { useState } from 'react';

const FocusResultView = ({ project, initialMinutes, formatTime, onSave, initialNote = "", completedSubIds: initialCompletedIds }) => {
  
  // --- [STATE] 入力項目 ---
  const [minutes, setMinutes] = useState(initialMinutes);
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSubIds, setCompletedSubIds] = useState(initialCompletedIds);
  const [note, setNote] = useState(initialNote);
  
  // 各小目標の「現在地」数値を保持するためのステート
  const [subTargetUpdates, setSubTargetUpdates] = useState(
    project.subTargets?.map(st => ({ id: st.id, current: st.current || 0 })) || []
  );

  const toggleSubTarget = (id) => {
    setCompletedSubIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubValueChange = (id, val) => {
    setSubTargetUpdates(prev => prev.map(st => 
      st.id === id ? { ...st, current: Number(val) } : st
    ));
  };

  const handleSave = () => {
    onSave({
      minutes: Number(minutes),
      count: Number(sessionCount),
      completedSubIds: completedSubIds,
      subTargetUpdates: subTargetUpdates, // 修正された数値リストを送信
      note: note
    });
  };

  return (
    <div style={{ padding: '40px 20px', background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>MISSION REPORT</h1>
        </header>

        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* 時間の確認・手入力 */}
          <section>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>MINUTES SPENT</label>
            <input 
              type="number" 
              value={minutes} 
              onChange={(e) => setMinutes(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', fontSize: '1.2rem' }}
            />
          </section>

          {/* セッション回数 */}
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

          {/* 小目標の進捗と達成チェック */}
          {project.subTargets?.length > 0 && (
            <section>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 'bold' }}>SUB-TARGET PROGRESS</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {project.subTargets.map(st => (
                  <div key={st.id} style={{ background: '#0f172a', padding: '15px', borderRadius: '12px', border: completedSubIds.includes(st.id) ? '2px solid #3b82f6' : '2px solid transparent' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                       <span style={{ fontWeight: 'bold' }}>{st.text}</span>
                       <input 
                        type="checkbox" 
                        checked={completedSubIds.includes(st.id)} 
                        onChange={() => toggleSubTarget(st.id)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                    
                    {/* 数値目標の場合、入力欄を表示 */}
                    {st.type === 'count' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Current:</span>
                        <input 
                          type="number" 
                          value={subTargetUpdates.find(u => u.id === st.id)?.current || 0}
                          onChange={(e) => handleSubValueChange(st.id, e.target.value)}
                          style={{ background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '5px 10px', borderRadius: '5px', width: '80px' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}> / {st.goal} {st.unit}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>SESSION NOTES</label>
            <textarea 
              rows="3"
              value={note} 
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', resize: 'none' }}
              placeholder="How was your session?"
            />
          </section>

          <button 
            onClick={handleSave}
            style={{ width: '100%', padding: '20px', borderRadius: '12px', border: 'none', background: '#22c55e', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            CONFIRM & SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusResultView;
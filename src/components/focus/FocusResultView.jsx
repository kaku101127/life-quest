import React, { useState } from 'react';
import MoodSelector from './MoodSelector';
import ResultSubTargetList from './ResultSubTargetList';

const FocusResultView = ({ project, initialMinutes, onSave, onBack, onCancel, initialNote = "", completedSubIds: initialCompletedIds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [completedSubIds, setCompletedSubIds] = useState([]);
  const [note, setNote] = useState(initialNote);
  const [mood, setMood] = useState('🙂');
  const [subTargetUpdates, setSubTargetUpdates] = useState(
    project.subTargets?.map(st => ({ id: st.id, current: st.current || 0 })) || []
  );

  const toggleSubTarget = (id) => {
    setCompletedSubIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubValueChange = (id, val) => {
    setSubTargetUpdates(prev => prev.map(st => st.id === id ? { ...st, current: Number(val) } : st));
  };

  return (
    <div style={{ padding: '40px 20px', background: '#0a0a0f', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textShadow: '0 0 10px rgba(34,197,94,0.5)' }}>MISSION REPORT</h1>
        </header>

        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          <MoodSelector currentMood={mood} onSelect={setMood} />

          <section>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>MINUTES SPENT</label>
            <input 
              type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: 'white', fontSize: '1.2rem' }}
            />
          </section>

          <ResultSubTargetList 
            subTargets={project.subTargets} 
            completedIds={completedSubIds} 
            updates={subTargetUpdates} 
            onToggle={toggleSubTarget} 
            onValueChange={handleSubValueChange} 
          />

          <section>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>FINAL NOTES</label>
            <textarea 
              rows="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="How was your session?"
              style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', resize: 'none' }}
            />
          </section>

          <button 
            onClick={() => onSave({ minutes: Number(minutes), completedSubIds, subTargetUpdates, note, mood })}
            style={{ width: '100%', padding: '20px', borderRadius: '12px', border: 'none', background: '#22c55e', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 0 20px rgba(34,197,94,0.4)' }}
          >
            CONFIRM & SAVE MISSION
          </button>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={onBack} style={{ flex: 1, padding: '12px', color: '#94a3b8', background: 'transparent', border: '1px solid #475569', borderRadius: '10px', cursor: 'pointer' }}>← BACK</button>
            <button onClick={onCancel} style={{ flex: 1, padding: '12px', color: '#ef4444', background: 'transparent', border: '1px solid #ef4444', borderRadius: '10px', cursor: 'pointer' }}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusResultView;
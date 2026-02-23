// TargetTabs.jsx
import React, { useState } from 'react';

const TargetTabs = ({ subTargets = [], onUpdateSubTarget }) => {
  const [activeTab, setActiveTab] = useState('targets');

  return (
    <div style={{ flex: 1, minWidth: '300px', border: '3px solid #111', borderRadius: '8px', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '8px 8px 0px #eee' }}>
      <div style={{ display: 'flex', borderBottom: '3px solid #111' }}>
        <button onClick={() => setActiveTab('targets')} style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'targets' ? '#111' : '#fff', color: activeTab === 'targets' ? '#fff' : '#111', fontWeight: '900' }}>TARGETS</button>
        <button onClick={() => setActiveTab('setting')} style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'setting' ? '#111' : '#fff', color: activeTab === 'setting' ? '#fff' : '#111', fontWeight: '900', borderLeft: '3px solid #111' }}>SETTING</button>
      </div>

      <div style={{ padding: '20px' }}>
        {activeTab === 'targets' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {subTargets.map((st) => (
              <div key={st.id} style={{ padding: '12px', borderLeft: `5px solid ${st.completed ? '#4CAF50' : '#111'}`, background: st.completed ? '#f0fff0' : '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: '#888' }}>{st.type === 'count' ? `GOAL: ${st.goal}` : 'TASK'}</div>
                  <div style={{ fontSize: '1rem', fontWeight: '900' }}>{st.completed ? `✅ ${st.name}` : st.name}</div>
                </div>
                {st.type === 'count' && <div style={{ fontWeight: '900' }}>{st.current || 0} / {st.goal}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>EDIT TARGET GOALS</div>
            {subTargets.filter(st => st.type === 'count').map((st) => (
              <div key={st.id} style={{ padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                <label style={{ fontSize: '0.7rem', color: '#666' }}>{st.name} ({st.unit})</label>
                <input 
                  type="number" 
                  defaultValue={st.goal}
                  onBlur={(e) => onUpdateSubTarget(st.id, e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '2px solid #111', fontWeight: 'bold' }}
                />
              </div>
            ))}
            <p style={{ fontSize: '0.6rem', color: '#999' }}>※ 数字を変更して枠の外をタップすると保存されます</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TargetTabs;
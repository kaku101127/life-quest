import React, { useState } from 'react';

const QuestTabs = ({ onUpdate }) => {
  const [activeTab, setActiveTab] = useState('targets');

  return (
    <div style={{ 
      flex: 1, minWidth: '300px', border: '3px solid #111', borderRadius: '8px', 
      background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '8px 8px 0px #eee'
    }}>
      {/* タブヘッダー */}
      <div style={{ display: 'flex', borderBottom: '3px solid #111' }}>
        <button onClick={() => setActiveTab('targets')} style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'targets' ? '#111' : '#fff', color: activeTab === 'targets' ? '#fff' : '#111', fontWeight: '900', cursor: 'pointer' }}>TARGETS</button>
        <button onClick={() => setActiveTab('action')} style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'action' ? '#111' : '#fff', color: activeTab === 'action' ? '#fff' : '#111', fontWeight: '900', cursor: 'pointer', borderLeft: '3px solid #111' }}>ACTION</button>
      </div>

      {/* タブ内容 */}
      <div style={{ padding: '20px' }}>
        {activeTab === 'targets' ? (
          <div>
            <div style={{ marginBottom: '15px', padding: '10px', borderLeft: '5px solid #111', background: '#f9f9f9' }}>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>CURRENT WEIGHT</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>74.5 kg</div>
            </div>
            <div style={{ padding: '10px', borderLeft: '5px solid #FFD700', background: '#f9f9f9' }}>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>BENCH PRESS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>95.0 kg</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => onUpdate(10)} style={{ padding: '12px', background: '#111', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏋️ WORKOUT (+10)</button>
            <button onClick={() => onUpdate(5)} style={{ padding: '12px', background: '#fff', color: '#111', border: '2px solid #111', fontWeight: 'bold', cursor: 'pointer' }}>🥗 CLEAN MEAL (+5)</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestTabs;
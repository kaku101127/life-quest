import React, { useState } from 'react';

const ActivityLogItem = ({ log }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 気分に応じたアクセントカラー（undefined対策済み）
  const getMoodColor = (mood) => {
    switch(mood) {
      case '🔥': return '#ff4757';
      case '🤩': return '#ffa502';
      case '😫': return '#747d8c';
      case '🙂': return '#2ed573';
      default: return '#1e90ff'; // デフォルトは青
    }
  };

  const moodColor = getMoodColor(log?.mood);
  const achievements = log?.subTargetSnapshot || [];

  // 日付の安全な表示
  const displayDate = () => {
    try {
      if (!log?.date) return 'DATE UNKNOWN';
      return new Date(log.date).toLocaleString('ja-JP', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return 'INVALID DATE';
    }
  };

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      style={{ 
        border: '2px solid #f0f0f0', 
        padding: '18px', 
        borderRadius: '12px',
        cursor: 'pointer',
        background: isOpen ? '#fafafa' : '#fff',
        borderLeft: `6px solid ${moodColor}`,
        marginBottom: '10px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#999' }}>{displayDate()}</div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {log?.minutes || 0} MINS {log?.mood || ''}
          </div>
        </div>
        <span style={{ opacity: 0.3 }}>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
          {log?.note && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#888', marginBottom: '4px' }}>MISSION NOTES</div>
              <div style={{ fontSize: '0.85rem', color: '#444', background: '#f0f2f5', padding: '10px', borderRadius: '8px' }}>
                {log.note}
              </div>
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#888', marginBottom: '6px' }}>SUB-GOALS PROGRESS</div>
              {achievements.map((st, i) => (
                <div key={i} style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginTop: '5px', padding: '4px 0' }}>
                  <span>{st.completed ? '✅' : '⚪'} {st.text}</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {st.type === 'count' ? `${st.current}/${st.goal}` : (st.completed ? 'DONE' : '-')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityLogItem;
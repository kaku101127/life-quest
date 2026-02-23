import React from 'react';

const MoodSelector = ({ currentMood, onSelect }) => {
  const moods = [
    { icon: '😫', label: 'Tired' },
    { icon: '😐', label: 'Neutral' },
    { icon: '🙂', label: 'Good' },
    { icon: '🤩', label: 'Great' },
    { icon: '🔥', label: 'On Fire' }
  ];

  return (
    <section>
      <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '12px', fontWeight: 'bold' }}>CONDITION</label>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', background: '#0f172a', padding: '15px', borderRadius: '15px' }}>
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => onSelect(m.icon)}
            style={{
              flex: 1, fontSize: '1.8rem', padding: '10px 0', cursor: 'pointer', transition: 'all 0.2s',
              background: currentMood === m.icon ? 'rgba(34,197,94,0.2)' : 'transparent',
              border: currentMood === m.icon ? '2px solid #22c55e' : '2px solid transparent',
              borderRadius: '12px',
              filter: currentMood === m.icon ? 'grayscale(0)' : 'grayscale(1) opacity(0.4)'
            }}
          >
            {m.icon}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MoodSelector;
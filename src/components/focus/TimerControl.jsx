import React from 'react';

const TimerControl = ({ 
  seconds, isActive, setIsActive, isManualMode, setIsManualMode, 
  manualMinutes, setManualMinutes, interimNote, setInterimNote, 
  onShowResult, formatTime 
}) => {
  const accentColor = isManualMode ? '#ff00ff' : '#00ffff';

  return (
    <div style={{
      background: 'linear-gradient(145deg, #1a1a2e, #16162a)',
      borderRadius: '15px', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 15px ${accentColor}33`,
      border: `1px solid ${accentColor}44`
    }}>
      {/* モード切替 */}
      <div style={{ display: 'flex', background: '#0a0a0f', borderRadius: '50px', padding: '5px' }}>
        <button onClick={() => setIsManualMode(false)} style={{ padding: '8px 20px', borderRadius: '50px', border: 'none', background: isManualMode ? 'transparent' : '#00ffff', color: isManualMode ? '#a0a0a0' : '#0a0a0f', fontWeight: 'bold' }}>⏱ TIMER</button>
        <button onClick={() => setIsManualMode(true)} style={{ padding: '8px 20px', borderRadius: '50px', border: 'none', background: isManualMode ? '#ff00ff' : 'transparent', color: isManualMode ? '#0a0a0f' : '#a0a0a0', fontWeight: 'bold' }}>✏️ MANUAL</button>
      </div>

      {/* タイマー円形表示 */}
      <div style={{
        width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #333',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3rem', fontWeight: '900', color: accentColor,
        textShadow: `0 0 15px ${accentColor}66`
      }}>
        {isManualMode ? (
          <input type="number" value={manualMinutes} onChange={(e) => setManualMinutes(e.target.value)} style={{ width: '80%', textAlign: 'center', background: 'transparent', border: 'none', color: '#ff00ff', fontSize: '3rem', outline: 'none' }} />
        ) : formatTime(seconds)}
      </div>

      <textarea
        value={interimNote} onChange={(e) => setInterimNote(e.target.value)}
        placeholder="Recording thoughts..." rows="2"
        style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid #333', color: '#e0e0e0', resize: 'none' }}
      />

      <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
        <button onClick={() => setIsActive(!isActive)} style={{ flex: 1, padding: '15px', borderRadius: '12px', border: 'none', background: isActive ? '#ff4757' : '#00b894', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          {isActive && !isManualMode ? 'PAUSE' : 'START'}
        </button>
        <button onClick={onShowResult} style={{ flex: 1, padding: '15px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          FINISH
        </button>
      </div>
    </div>
  );
};

export default TimerControl;
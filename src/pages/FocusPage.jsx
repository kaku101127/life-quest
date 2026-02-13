import React, { useState, useEffect } from 'react';

const FocusPage = ({ questName, onFinish, onCancel }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // 1秒ごとにカウントアップする
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#1e293b', minHeight: '100vh', color: 'white' }}>
      <h2>Focusing on:</h2>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>{questName}</h1>
      
      <div style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '40px', fontFamily: 'monospace' }}>
        {formatTime(seconds)}
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setIsActive(!isActive)}
          style={{ padding: '15px 30px', borderRadius: '12px', border: 'none', background: isActive ? '#f59e0b' : '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button 
          onClick={() => onFinish(Math.floor(seconds / 60))} 
          style={{ padding: '15px 30px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Finish & Save
        </button>
        <button 
          onClick={onCancel}
          style={{ padding: '15px 30px', borderRadius: '12px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FocusPage;
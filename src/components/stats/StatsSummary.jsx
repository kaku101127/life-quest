// src/components/StatsSummary.jsx
import React from 'react';

const StatsSummary = ({ totalTime, streak, sessions }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>TOTAL TIME</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{totalTime} <span style={{ fontSize: '1rem' }}>hrs</span></div>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>STREAK</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF4500' }}>{streak} <span style={{ fontSize: '1rem' }}>days</span></div>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>SESSIONS</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{sessions}</div>
      </div>
    </div>
  );
};

export default StatsSummary;
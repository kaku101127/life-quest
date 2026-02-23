import React from 'react';

const StatsHeader = ({ title, onBack }) => (
  <>
    <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: 'none', background: '#ddd', fontWeight: 'bold' }}>
      ← BACK TO DASHBOARD
    </button>

    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', color: '#fff', padding: '25px 40px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
      <div>
        <div style={{ fontSize: '0.8rem', color: '#FFD700', letterSpacing: '2px', marginBottom: '5px' }}>CURRENT QUEST</div>
        <h1 style={{ margin: 0, fontSize: '2.5rem', textTransform: 'uppercase', lineHeight: '1' }}>{title}</h1>
      </div>
    </header>
  </>
);

export default StatsHeader;
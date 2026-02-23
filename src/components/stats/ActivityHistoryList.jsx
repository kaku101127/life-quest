import React from 'react';
import ActivityLogItem from './ActivityLogItem';

const ActivityHistoryList = ({ history = [] }) => {
  return (
    <section style={{ marginTop: '40px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '4px solid #111', display: 'inline-block' }}>ACTIVITY HISTORY</h2>
      
      {!history || history.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>No session logs available yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...history].reverse().map((log) => (
            <ActivityLogItem key={log.id || Math.random()} log={log} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivityHistoryList;
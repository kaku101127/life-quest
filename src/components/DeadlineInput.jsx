import React from 'react';

const DeadlineInput = ({ deadline, setDeadline }) => {
  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>DEADLINE</label>
      <input 
        type="date" 
        value={deadline} 
        onChange={e => setDeadline(e.target.value)} 
        style={{ width: '100%', padding: '10px', border: '2px solid #111', borderRadius: '4px' }} 
      />
    </div>
  );
};

export default DeadlineInput;
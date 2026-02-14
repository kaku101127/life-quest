import React from 'react';

const QuestBaseInfoInput = ({ name, setName, mainGoalValue, setMainGoalValue, mainUnit, setMainUnit, mainGoalDesc, setMainGoalDesc }) => {
  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>QUEST NAME</label>
        <input 
          required 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ width: '100%', padding: '10px', border: '2px solid #111', borderRadius: '4px' }} 
          placeholder="例: English Study" 
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <div style={{ flex: 2 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>MAIN GOAL (VALUE)</label>
            <input 
              type="number" 
              required
              value={mainGoalValue} 
              onChange={e => setMainGoalValue(e.target.value)} 
              style={{ width: '100%', padding: '10px', border: '2px solid #111', borderRadius: '4px' }} 
              placeholder="例: 100" 
            />
        </div>
        <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>UNIT</label>
            <select 
              value={mainUnit} 
              onChange={e => setMainUnit(e.target.value)} 
              style={{ width: '100%', padding: '10px', border: '2px solid #111', borderRadius: '4px', background: '#fff' }}
            >
              <option value="時間">時間</option>
              <option value="回">回</option>
            </select>
        </div>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>GOAL DESCRIPTION</label>
        <input 
            value={mainGoalDesc} 
            onChange={e => setMainGoalDesc(e.target.value)} 
            style={{ width: '100%', padding: '10px', border: '2px solid #111', borderRadius: '4px' }} 
            placeholder="例: TOEIC 800点突破" 
        />
      </div>
    </>
  );
};

export default QuestBaseInfoInput;
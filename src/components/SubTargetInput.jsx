import React from 'react';

// 小目標の1行分を担当するコンポーネント
const SubTargetInput = ({ st, onUpdate }) => {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', background: '#f9f9f9' }}>
      <input 
        placeholder="ターゲットの内容" 
        value={st.text} 
        onChange={e => onUpdate(st.id, 'text', e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '5px', border: 'none', borderBottom: '2px solid #111', background: 'transparent' }}
      />
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select 
          value={st.type} 
          onChange={e => onUpdate(st.id, 'type', e.target.value)}
          style={{ padding: '5px', border: '1px solid #111', borderRadius: '4px' }}
        >
          <option value="check">Check型</option>
          <option value="count">数値型</option>
        </select>

        {st.type === 'count' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="number" 
              value={st.goal} 
              onChange={e => onUpdate(st.id, 'goal', e.target.value)} 
              style={{ width: '50px', padding: '5px' }} 
            />
            <input 
              placeholder="単位" 
              value={st.unit} 
              onChange={e => onUpdate(st.id, 'unit', e.target.value)} 
              style={{ width: '50px', padding: '5px' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubTargetInput;
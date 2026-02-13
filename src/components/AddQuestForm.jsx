import React, { useState } from 'react';

const AddQuestForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    
    // 親コンポーネントに新しいクエストの情報を渡す
    onAdd({ name, target: Number(target) });
    
    // 入力欄を空にする
    setName('');
    setTarget('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: '#fff', padding: '20px', borderRadius: '20px', 
      display: 'flex', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
      marginBottom: '30px', alignItems: 'center' 
    }}>
      <input 
        type="text" 
        placeholder="New Goal (e.g. English)" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', flex: 1, fontSize: '16px' }}
      />
      <input 
        type="number" 
        placeholder="Hrs" 
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '80px', fontSize: '16px' }}
      />
      <button type="submit" style={{ 
        background: '#1e293b', color: 'white', border: 'none', 
        padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' 
      }}>
        Add
      </button>
    </form>
  );
};

export default AddQuestForm;
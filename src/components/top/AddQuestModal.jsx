import React, { useState } from 'react';
import SubTargetInput from './SubTargetInput';
import QuestBaseInfoInput from './QuestBaseInfoInput';
import DeadlineInput from '../common/DeadlineInput';

const AddQuestModal = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [mainGoalValue, setMainGoalValue] = useState('');
  const [mainUnit, setMainUnit] = useState('時間');
  const [mainGoalDesc, setMainGoalDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  
  // 1. 初期表示を空配列にする（これで初期状態の空枠が消えます）
  const [subTargets, setSubTargets] = useState([]);

  // 新規フィールド追加
  const addSubTargetField = () => {
    setSubTargets([...subTargets, { id: Date.now(), text: '', type: 'check', goal: 1, unit: '回' }]);
  };

  // 2. 削除機能の追加
  const deleteSubTarget = (id) => {
    setSubTargets(subTargets.filter(st => st.id !== id));
  };

  const updateSubTarget = (id, field, value) => {
    setSubTargets(subTargets.map(st => st.id === id ? { ...st, [field]: value } : st));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. 送信時に「textが空」のターゲットをフィルタリングして除外
    const validSubTargets = subTargets.filter(st => st.text && st.text.trim() !== '');

    onAdd({ 
      name, 
      target: Number(mainGoalValue),
      unit: mainUnit,
      mainGoal: mainGoalDesc,
      deadline, 
      subTargets: validSubTargets 
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', color: '#111' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '900' }}>NEW QUEST</h2>
        
        <form onSubmit={handleSubmit}>
          {/* 基本情報入力部品 */}
          <QuestBaseInfoInput 
            name={name} setName={setName}
            mainGoalValue={mainGoalValue} setMainGoalValue={setMainGoalValue}
            mainUnit={mainUnit} setMainUnit={setMainUnit}
            mainGoalDesc={mainGoalDesc} setMainGoalDesc={setMainGoalDesc}
          />

          {/* 期限入力部品 */}
          <DeadlineInput deadline={deadline} setDeadline={setDeadline} />

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>SUB TARGETS</label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
              {subTargets.map((st) => (
                <div key={st.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  {/* メインの入力欄 */}
                  <div style={{ flex: 1 }}>
                    <SubTargetInput st={st} onUpdate={updateSubTarget} />
                  </div>
                  
                  {/* 削除ボタン */}
                  <button 
                    type="button" 
                    onClick={() => deleteSubTarget(st.id)}
                    style={{ 
                      padding: '8px 12px', 
                      background: '#ff4757', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      marginTop: '5px' // 入力欄との高さ調整
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={addSubTargetField} 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px dashed #ccc', 
                background: '#f9f9f9', 
                cursor: 'pointer', 
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#666',
                fontWeight: 'bold'
              }}
            >
              + Add Sub Target
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>CANCEL</button>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#111', color: '#fff', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>CREATE QUEST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestModal;
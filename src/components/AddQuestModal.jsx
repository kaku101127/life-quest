import React, { useState } from 'react';
import SubTargetInput from './SubTargetInput';
import QuestBaseInfoInput from './QuestBaseInfoInput'; // ★新しく追加
import DeadlineInput from './DeadlineInput';         // ★新しく追加

const AddQuestModal = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [mainGoalValue, setMainGoalValue] = useState('');
  const [mainUnit, setMainUnit] = useState('時間');
  const [mainGoalDesc, setMainGoalDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subTargets, setSubTargets] = useState([
    { id: Date.now(), text: '', type: 'check', goal: 1, unit: '回' }
  ]);

  const addSubTargetField = () => {
    setSubTargets([...subTargets, { id: Date.now(), text: '', type: 'check', goal: 1, unit: '回' }]);
  };

  const updateSubTarget = (id, field, value) => {
    setSubTargets(subTargets.map(st => st.id === id ? { ...st, [field]: value } : st));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ 
      name, 
      target: Number(mainGoalValue),
      unit: mainUnit,
      mainGoal: mainGoalDesc,
      deadline, 
      subTargets 
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '900' }}>NEW QUEST</h2>
        
        <form onSubmit={handleSubmit}>
          {/* ★基本情報入力部品 */}
          <QuestBaseInfoInput 
            name={name} setName={setName}
            mainGoalValue={mainGoalValue} setMainGoalValue={setMainGoalValue}
            mainUnit={mainUnit} setMainUnit={setMainUnit}
            mainGoalDesc={mainGoalDesc} setMainGoalDesc={setMainGoalDesc}
          />

          {/* ★期限入力部品 */}
          <DeadlineInput deadline={deadline} setDeadline={setDeadline} />

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>SUB TARGETS</label>
            {subTargets.map((st) => (
              <SubTargetInput key={st.id} st={st} onUpdate={updateSubTarget} />
            ))}
            <button type="button" onClick={addSubTargetField} style={{ width: '100%', padding: '10px', border: '2px dashed #aaa', background: 'none', cursor: 'pointer', borderRadius: '8px' }}>
              + Add Sub Target
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: '#ddd', border: 'none', fontWeight: 'bold', borderRadius: '4px' }}>CANCEL</button>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#111', color: '#fff', border: 'none', fontWeight: 'bold', borderRadius: '4px' }}>CREATE QUEST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestModal;
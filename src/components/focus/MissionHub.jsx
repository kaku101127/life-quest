import React, { useState } from 'react';

const MissionHub = ({ project, onAddSubTarget, onDeleteSubTarget, onMoveSubTarget }) => {
  const [newTargetType, setNewTargetType] = useState('check');
  const [goalValue, setGoalValue] = useState(1);
  const [inputText, setInputText] = useState('');

  // --- 進捗計算を QuestCard と統一 ---
  const current = Number(project.currentProgress) || 0;
  const goal = Number(project.mainGoal) || 1;
  const progressPercentage = Math.min(Math.round((current / goal) * 100), 100);

  const handleAdd = () => {
    if (!inputText.trim()) return;
    onAddSubTarget(inputText, newTargetType, goalValue);
    setInputText('');
    setGoalValue(1);
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, #1a1a2e, #16162a)',
      borderRadius: '15px', padding: '25px', border: '1px solid rgba(0,255,255,0.3)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ fontSize: '0.9rem', color: '#00ffff', letterSpacing: '2px', marginBottom: '10px' }}>MISSION HUB</h2>
      <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>{project.name.toUpperCase()}</h1>
      
      {/* メイン進捗 */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '0.9rem', color: '#a0a0a0', marginBottom: '5px' }}>
          Progress: {current.toFixed(1)} / {goal} {project.unit}
          <span style={{ float: 'right', fontWeight: 'bold', color: '#00ffff' }}>{progressPercentage}%</span>
        </p>
        <div style={{ background: '#333', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #00bfff, #00ffff)', transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* 小目標リスト */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {project.subTargets?.map((st, index) => (
          <div key={st.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', border: '1px solid rgba(0,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '12px', opacity: 0.5 }}>
              <button onClick={() => onMoveSubTarget(index, -1)} style={{ background: 'transparent', border: 'none', color: '#00ffff', cursor: 'pointer', fontSize: '0.7rem' }}>▲</button>
              <button onClick={() => onMoveSubTarget(index, 1)} style={{ background: 'transparent', border: 'none', color: '#00ffff', cursor: 'pointer', fontSize: '0.7rem' }}>▼</button>
            </div>
            
            {/* ★ここを修正：st.name を優先的に表示する */}
            <span style={{ flex: 1, fontSize: '0.9rem', color: st.completed ? '#666' : '#fff' }}>
              {st.name || st.text}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {st.type === 'count' ? (
                <span style={{ fontSize: '0.8rem', color: '#00ffff', fontWeight: 'bold' }}>{st.current || 0}/{st.goal}</span>
              ) : (
                <input type="checkbox" checked={st.completed} readOnly style={{ accentColor: '#00ffff' }} />
              )}
              <button onClick={() => onDeleteSubTarget(st.id)} style={{ background: 'transparent', border: 'none', color: '#ff4757', cursor: 'pointer' }}>✕</button>
            </div>
          </div>
        ))}

        {/* 追加フォーム */}
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
              placeholder={newTargetType === 'check' ? "+ Add check goal..." : "+ Add count goal..."}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px dashed #00ffff55', borderRadius: '8px', padding: '10px', color: '#fff' }}
            />
            <button onClick={() => setNewTargetType(newTargetType === 'check' ? 'count' : 'check')} style={{ width: '70px', fontSize: '0.65rem', background: newTargetType === 'count' ? '#ff00ff' : '#333', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              {newTargetType === 'check' ? '☑︎ CHECK' : '🔢 COUNT'}
            </button>
            <button onClick={handleAdd} style={{ width: '50px', background: '#00ffff', color: '#0a0a0f', fontWeight: '900', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>ADD</button>
          </div>
          {newTargetType === 'count' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'rgba(255, 0, 255, 0.1)', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#ff00ff' }}>TARGET AMOUNT:</span>
              <input type="number" value={goalValue} onChange={(e) => setGoalValue(Number(e.target.value))} style={{ width: '60px', background: '#000', border: '1px solid #ff00ff', color: '#fff', textAlign: 'center' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionHub;
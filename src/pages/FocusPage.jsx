import React, { useState, useEffect } from 'react';
import SubTargetItem from '../components/common/SubTargetItem';

const FocusPage = ({ project, onFinish, onCancel }) => {
  const [phase, setPhase] = useState('timer'); // 'timer' or 'result'
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [currentSubTargets, setCurrentSubTargets] = useState(project.subTargets || []);
  
  // --- タイマーロジック (1箇所に集約) ---
  useEffect(() => {
    let interval = isActive && phase === 'timer' ? setInterval(() => setSeconds(s => s + 1), 1000) : null;
    return () => clearInterval(interval);
  }, [isActive, phase]);

  // --- ハンドラー (一括管理) ---
  const handleTargetAction = (action, id, payload) => {
    if (action === 'add') {
      const newSub = { id: Date.now(), name: payload, type: 'check', completed: false };
      setCurrentSubTargets([...currentSubTargets, newSub]);
    }
    if (action === 'delete') setCurrentSubTargets(currentSubTargets.filter(t => t.id !== id));
    if (action === 'toggle') {
      setCurrentSubTargets(currentSubTargets.map(t => t.id === id ? {...t, completed: !t.completed} : t));
    }
  };

  // --- 内部部品 A: タイマー表示 ---
  const TimerView = () => (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{project.name}</h1>
      <div style={timerCircleStyle}>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</div>
      
      <div style={listContainerStyle}>
        {currentSubTargets.map(st => (
          <SubTargetItem key={st.id} st={st} mode="manage" onAction={(type, id) => handleTargetAction(type, id)} />
        ))}
      </div>
      
      <button onClick={() => setPhase('result')} style={mainBtnStyle}>FINISH SESSION</button>
    </div>
  );

  // --- 内部部品 B: 結果入力 ---
  const ResultView = () => (
    <div style={containerStyle}>
      <h1 style={titleStyle}>MISSION COMPLETE</h1>
      <div style={listContainerStyle}>
        {currentSubTargets.map(st => (
          <SubTargetItem key={st.id} st={st} mode="check" onAction={(type, id) => handleTargetAction(type, id)} />
        ))}
      </div>
      <button onClick={() => onFinish({ ...project, subTargets: currentSubTargets, mins: Math.floor(seconds/60) })} style={mainBtnStyle}>SAVE & REPORT</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', padding: '20px' }}>
      {phase === 'timer' ? <TimerView /> : <ResultView />}
    </div>
  );
};

// スタイルは末尾にまとめて定義（またはCSS変数へ）
const containerStyle = { maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' };
const titleStyle = { fontSize: '1.2rem', color: '#00ffff', textAlign: 'center' };
const timerCircleStyle = { fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '40px 0' };
const listContainerStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const mainBtnStyle = { background: '#00ffff', color: '#000', padding: '15px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' };

export default FocusPage;
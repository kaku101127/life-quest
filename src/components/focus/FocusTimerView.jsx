import React from 'react';
import MissionHub from './MissionHub';
import TimerControl from './TimerControl';

const FocusTimerView = (props) => {
  // propsの中から、MissionHubに必要な関数をしっかり取り出す
  const { 
    onCancel, 
    project, 
    onAddSubTarget,    // ← これが抜けていないかチェック
    onDeleteSubTarget, 
    onMoveSubTarget, 
    ...timerProps      // 残り（seconds, isActiveなど）はtimerPropsへ
  } = props;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', padding: '20px', color: '#e0e0e0' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* MissionHubに必要な関数を一つずつ明示的に渡す */}
        <MissionHub 
          project={project} 
          onAddSubTarget={onAddSubTarget} 
          onDeleteSubTarget={onDeleteSubTarget} 
          onMoveSubTarget={onMoveSubTarget} 
        />

        <TimerControl {...timerProps} />

        <button onClick={onCancel} style={{ alignSelf: 'center', background: 'transparent', border: 'none', color: '#555', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>
          CANCEL MISSION
        </button>
      </div>
    </div>
  );
};

export default FocusTimerView;
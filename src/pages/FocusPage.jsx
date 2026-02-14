import React, { useState, useEffect } from 'react';
import FocusTimerView from '../components/FocusTimerView';
import FocusResultView from '../components/FocusResultView';

const FocusPage = ({ project, onFinish, onCancel }) => {
  // --- [STATE] タイマー制御 ---
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // --- [STATE] 手入力モード用 ---
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualMinutes, setManualMinutes] = useState("");

  // --- [STATE] 入力データ ---
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSubIds, setCompletedSubIds] = useState([]);
  const [interimNote, setInterimNote] = useState('');

  // --- [LOGIC] タイマー ---
  useEffect(() => {
    let interval = null;
    // 手入力モード時はタイマーを止める
    if (isActive && !showResult && !isManualMode) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, showResult, isManualMode]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleSubTarget = (id) => {
    setCompletedSubIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- [LOGIC] 最終保存処理 ---
  const handleFinalSave = (finalResultData) => {
    // 手入力があればそれを優先、なければタイマーの分を計算
    const finalMinutes = isManualMode ? Number(finalResultData.minutes) : Math.floor(seconds / 60);

    onFinish({
      questId: project.id,
      minutes: finalMinutes,
      count: Number(finalResultData.count),
      completedSubIds: finalResultData.completedSubIds,
      subTargetUpdates: finalResultData.subTargetUpdates, // 各小目標の最新数値
      note: finalResultData.note,
      timestamp: new Date().toISOString()
    });
  };

  // 1. リザルト画面
  if (showResult) {
    return (
      <FocusResultView 
        project={project}
        // タイマーの結果または手入力を初期値として渡す
        initialMinutes={isManualMode ? manualMinutes : Math.floor(seconds / 60)}
        formatTime={formatTime}
        sessionCount={sessionCount}
        completedSubIds={completedSubIds}
        initialNote={interimNote} 
        onSave={handleFinalSave}
      />
    );
  }

  // 2. タイマー画面
  return (
    <FocusTimerView 
      project={project}
      seconds={seconds}
      formatTime={formatTime}
      isActive={isActive}
      setIsActive={setIsActive}
      // 手入力用プロップスを追加
      isManualMode={isManualMode}
      setIsManualMode={setIsManualMode}
      manualMinutes={manualMinutes}
      setManualMinutes={setManualMinutes}
      interimNote={interimNote}
      setInterimNote={setInterimNote}
      onShowResult={() => setShowResult(true)}
      onCancel={onCancel}
    />
  );
};

export default FocusPage;
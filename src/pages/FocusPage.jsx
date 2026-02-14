import React, { useState, useEffect } from 'react';
import FocusTimerView from '../components/FocusTimerView';
import FocusResultView from '../components/FocusResultView';

const FocusPage = ({ project, onFinish, onCancel }) => {
  // --- [STATE] 基本的なタイマー制御 ---
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // --- [STATE] セッション中の入力データ ---
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSubIds, setCompletedSubIds] = useState([]);
  const [interimNote, setInterimNote] = useState(''); // 修行中のメモを保持

  // --- [LOGIC] タイマーのカウントアップ ---
  useEffect(() => {
    let interval = null;
    if (isActive && !showResult) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, showResult]);

  // 時間のフォーマット (0:00形式)
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // 小目標のチェック切り替え
  const toggleSubTarget = (id) => {
    setCompletedSubIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- [LOGIC] 最終保存処理 ---
  // App.jsxに全てのログデータを送信します
  const handleFinalSave = (finalResultData) => {
    onFinish({
      questId: project.id,
      minutes: Math.floor(seconds / 60),
      // ResultViewから渡された最新の入力値（メモや回数）を優先して保存
      count: Number(finalResultData.count || sessionCount),
      completedSubIds: finalResultData.completedSubIds || completedSubIds,
      note: finalResultData.note || interimNote,
      timestamp: new Date().toISOString()
    });
  };

  // --- [RENDER] 表示の切り分け ---

  // 1. リザルト画面 (修行終了後の報告)
  if (showResult) {
    return (
      <FocusResultView 
        project={project}
        seconds={seconds}
        formatTime={formatTime}
        sessionCount={sessionCount}
        setSessionCount={setSessionCount}
        completedSubIds={completedSubIds}
        toggleSubTarget={toggleSubTarget}
        // interimNoteを初期値としてリザルト画面へ渡す
        initialNote={interimNote} 
        onSave={handleFinalSave}
      />
    );
  }

  // 2. タイマー画面 (修行中)
  return (
    <FocusTimerView 
      project={project} // projectごと渡すように変更（小目標リスト表示のため）
      seconds={seconds}
      formatTime={formatTime}
      isActive={isActive}
      setIsActive={setIsActive}
      // 中間メモの受け渡し
      interimNote={interimNote}
      setInterimNote={setInterimNote}
      onShowResult={() => setShowResult(true)}
      onCancel={onCancel}
    />
  );
};

export default FocusPage;
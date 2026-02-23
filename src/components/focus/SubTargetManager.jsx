import React from 'react';

// このコンポーネントは、FocusTimerViewの中でインポートして使います
const SubTargetManager = ({ subTargets, setSubTargets }) => {
  const handleAdd = (text, type = 'count', goal = 1) => {
    const newSub = { id: Date.now(), name: text, type, goal, current: 0, completed: false };
    setSubTargets([...subTargets, newSub]);
  };

  const handleDelete = (id) => {
    setSubTargets(subTargets.filter(st => st.id !== id));
  };

  const move = (index, direction) => {
    const newItems = [...subTargets];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setSubTargets(newItems);
  };

  // ここには入力フォームのJSXを書きます（FocusTimerViewから移動）
  return (
    <div className="sub-target-editor">
      {/* 以前 FocusTimerView にあった編集 UI をここに集約 */}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';

import LoginPage from './pages/LoginPage';
import TopPage from './pages/TopPage';
import StatsPage from './pages/StatsPage'; 
import FocusPage from './pages/FocusPage';
import { generateHistoryData } from './utils/utils';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedQuestName, setSelectedQuestName] = useState(''); 
  const [viewMode, setViewMode] = useState('top');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) { setProjects([]); setLoading(false); }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // SETTINGタブで目標数値を更新する関数
  const handleUpdateSubTarget = async (questId, subTargetId, newGoal) => {
    if (!user) return;
    const targetProject = projects.find(p => p.id === questId);
    if (!targetProject) return;

    const updatedSubTargets = targetProject.subTargets.map(st => 
      st.id === subTargetId ? { ...st, goal: Number(newGoal), completed: (st.current || 0) >= Number(newGoal) } : st
    );

    await updateDoc(doc(db, "users", user.uid, "projects", questId.toString()), {
      subTargets: updatedSubTargets
    });
  };

  const handleLogin = async () => { try { await signInWithPopup(auth, googleProvider); } catch (e) { console.error(e); } };
  const handleLogout = () => signOut(auth);

  // フォーカス終了時の保存処理
  const handleFinishFocus = async (result) => {
    if (!user) return;
    const targetProject = projects.find(p => p.id === result.questId);
    if (!targetProject) return;

    // サブターゲットの進捗を計算
    const baseSubTargets = result.updatedSubTargets || targetProject.subTargets || [];
    const finalSubTargets = baseSubTargets.map(st => {
      const update = result.subTargetUpdates?.find(u => u.id === st.id);
      const currentVal = update ? update.current : (st.current || 0);
      return { 
        ...st, 
        current: currentVal,
        completed: currentVal >= st.goal 
      };
    });

    // ログデータを作成
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      minutes: result.minutes || 0,
      count: result.count || 0,
      note: result.note || "",
      subTargetSnapshot: finalSubTargets
    };

    // メイン進捗の計算
    const increment = (targetProject.unit === 'Hours' || targetProject.unit === '時間') 
      ? (result.minutes || 0) / 60 
      : (result.count || 0);

    const nextValue = (targetProject.currentProgress || 0) + increment;

    // Firestore更新
    const projectRef = doc(db, "users", user.uid, "projects", result.questId.toString());
    await updateDoc(projectRef, {
      currentProgress: nextValue,
      totalMins: (targetProject.totalMins || 0) + (result.minutes || 0),
      subTargets: finalSubTargets,
      history: [...(targetProject.history || []), newLog]
    });

    setViewMode('top');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'focus':
        return <FocusPage project={selectedProject} onFinish={handleFinishFocus} onCancel={() => setViewMode('top')} />;
      case 'stats':
        const currentProj = projects.find(p => p.id === selectedProject?.id);
        const projectHistory = currentProj?.history || [];
        const baseChartData = generateHistoryData(7); 
        const finalChartData = baseChartData.map(dayBucket => {
          const label = dayBucket.day || dayBucket.name; 
          const dayTotal = projectHistory.filter(log => {
            const logDate = new Date(log.date);
            return `${logDate.getMonth() + 1}/${logDate.getDate()}` === label;
          }).reduce((sum, log) => sum + (log.minutes || 0), 0);
          return { ...dayBucket, time: dayTotal };
        });

        // case 'stats': の中の return 部分を修正
        return (
          <StatsPage 
            questTitle={selectedQuestName}
            statsData={finalChartData}
            history={projectHistory}
            subTargets={currentProj?.subTargets || []} 
            // ★ここを修正：計算済みの%ではなく、生の進捗数値を渡す
            currentProgress={currentProj ? currentProj.currentProgress : 0} 
            // ★ここを追加：目標数値も渡す（バーの計算に必要）
            mainGoal={currentProj ? currentProj.mainGoal : 1}
            totalTime={currentProj ? (currentProj.totalMins / 60).toFixed(1) : "0.0"}
            onUpdateSubTarget={(stId, newGoal) => handleUpdateSubTarget(currentProj.id, stId, newGoal)}
            onBack={() => setViewMode('top')}
          />
        );
      default:
        return (
          <div>
            <div style={{ textAlign: 'right', padding: '10px' }}><button onClick={handleLogout} style={{ fontSize: '12px', opacity: 0.6 }}>Logout</button></div>
            <TopPage 
              projects={projects} 
              onStartFocus={(p) => { setSelectedProject(p); setSelectedQuestName(p.name); setViewMode('focus'); }} 
              onStartQuest={(id) => { const t = projects.find(p => p.id === id); if (t) { setSelectedProject(t); setSelectedQuestName(t.name); setViewMode('stats'); } }} 
              onAdd={async (data) => { await setDoc(doc(collection(db, "users", user.uid, "projects")), { ...data, totalMins: 0, currentProgress: 0, color: '#111', history: [] }); }} 
            />
          </div>
        );
    }
  };

  return <div className="app-container">{renderContent()}</div>;
}

export default App;
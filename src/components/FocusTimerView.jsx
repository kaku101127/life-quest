import React from 'react';

const FocusTimerView = ({ 
  project, 
  seconds, 
  formatTime, 
  isActive, 
  setIsActive, 
  isManualMode, // 手入力モードかどうかのフラグ
  setIsManualMode, // 手入力モード切り替え関数
  manualMinutes, // 手入力された時間
  setManualMinutes, // 手入力時間更新関数
  interimNote, 
  setInterimNote, 
  onShowResult, 
  onCancel 
}) => {

  const progressPercentage = Math.min((project.totalMins / (project.target * 60)) * 100, 100);

  return (
    <div style={{
      background: '#0a0a0f', // 全体の深い背景色
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      color: '#e0e0e0', // デフォルトの文字色
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', // 少しSFっぽいフォント
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
      }}>

        {/* MISSION HUB (上段) */}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e, #16162a)',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0,255,255,0.2)', // ネオンシャドウ
          border: '1px solid rgba(0,255,255,0.3)',
          marginBottom: '20px',
        }}>
          <h2 style={{
            fontSize: '0.9rem',
            color: '#00ffff', // アクセントカラー
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '10px',
            fontWeight: '600',
          }}>MISSION HUB</h2>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '10px',
            textShadow: '0 0 10px rgba(0,255,255,0.6)', // タイトルにもネオン
          }}>{project.name.toUpperCase()}</h1>
          
          {/* メイン目標プログレスバー */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.9rem', color: '#a0a0a0', marginBottom: '5px' }}>
              Target: {project.target} {project.unit}
              <span style={{ float: 'right', fontWeight: 'bold', color: '#00ffff' }}>{progressPercentage.toFixed(0)}%</span>
            </p>
            <div style={{ background: '#333', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #00bfff, #00ffff)', transition: 'width 0.5s ease-out' }} />
            </div>
          </div>

          {/* 小目標リスト */}
          {project.subTargets && project.subTargets.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '0.8rem', color: '#00ffff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>SUB-GOALS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.subTargets.map(st => (
                  <div key={st.id} style={{ 
                    background: 'rgba(0,0,0,0.3)', 
                    padding: '12px 15px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    border: '1px solid rgba(0,255,255,0.1)',
                  }}>
                    <span style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>{st.text}</span>
                    {st.type === 'count' ? (
                      <span style={{ fontSize: '0.8rem', color: '#00ffff', fontWeight: 'bold' }}>
                        {st.current || 0}/{st.goal}{st.unit}
                      </span>
                    ) : (
                      <input type="checkbox" checked={st.completed} readOnly style={{ accentColor: '#00ffff' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CONTROL CENTER (中段) */}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e, #16162a)',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255,0,255,0.2)', // 紫ネオンシャドウ
          border: '1px solid rgba(255,0,255,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* モード切替タブ */}
          <div style={{ 
            display: 'flex', 
            background: '#0a0a0f', 
            borderRadius: '50px', 
            padding: '5px', 
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.7)',
          }}>
            <button 
              onClick={() => setIsManualMode(false)} 
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: isManualMode ? 'transparent' : '#00ffff',
                color: isManualMode ? '#a0a0a0' : '#0a0a0f',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
                boxShadow: isManualMode ? 'none' : '0 0 10px rgba(0,255,255,0.5)',
              }}
            >
              ⏱ TIMER
            </button>
            <button 
              onClick={() => setIsManualMode(true)} 
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: isManualMode ? '#ff00ff' : 'transparent',
                color: isManualMode ? '#0a0a0f' : '#a0a0a0',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
                boxShadow: isManualMode ? '0 0 10px rgba(255,0,255,0.5)' : 'none',
              }}
            >
              ✏️ MANUAL
            </button>
          </div>

          {/* タイマー表示 / マニュアル入力 */}
          <div style={{
            position: 'relative',
            width: '250px', // 円のサイズ
            height: '250px',
            borderRadius: '50%',
            border: '5px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            fontWeight: '900',
            color: '#00ffff',
            textShadow: '0 0 15px rgba(0,255,255,0.7)',
            boxShadow: 'inset 0 0 20px rgba(0,255,255,0.3)',
          }}>
            {isManualMode ? (
              <input
                type="number"
                value={manualMinutes}
                onChange={(e) => setManualMinutes(e.target.value)}
                placeholder="0"
                style={{
                  width: '80%',
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: '#ff00ff', // マニュアル入力時は別の色で目立たせる
                  fontSize: '3rem',
                  fontWeight: '900',
                  textShadow: '0 0 15px rgba(255,0,255,0.7)',
                }}
              />
            ) : (
              formatTime(seconds)
            )}
          </div>

          {/* START/PAUSE/FINISH ボタン */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <button 
              onClick={() => setIsActive(!isActive)} 
              style={{
                padding: '12px 30px',
                borderRadius: '50px',
                border: 'none',
                background: isActive ? '#ff4757' : '#00b894', // 赤/緑
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background 0.3s ease, transform 0.1s ease',
                boxShadow: isActive ? '0 0 15px rgba(255,71,87,0.7)' : '0 0 15px rgba(0,184,148,0.7)',
                '&:active': { transform: 'scale(0.98)' }
              }}
            >
              {isActive && !isManualMode ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={onShowResult} 
              style={{
                padding: '12px 30px',
                borderRadius: '50px',
                border: 'none',
                background: '#ffbe76', // 黄色っぽい
                color: '#0a0a0f',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background 0.3s ease, transform 0.1s ease',
                boxShadow: '0 0 15px rgba(255,190,118,0.7)',
                '&:active': { transform: 'scale(0.98)' }
              }}
            >
              FINISH
            </button>
          </div>
        </div>

        {/* Dynamic Footer (下段) */}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e, #16162a)',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}>
          {/* 中間メモ */}
          <textarea
            value={interimNote}
            onChange={(e) => setInterimNote(e.target.value)}
            placeholder="Add your thoughts or observations during focus..."
            rows="2"
            style={{
              width: 'calc(100% - 20px)',
              padding: '10px',
              borderRadius: '8px',
              background: '#0a0a0f',
              border: '1px solid #333',
              color: '#e0e0e0',
              fontSize: '0.9rem',
              resize: 'none',
            }}
          />
          {/* キャンセルボタン */}
          <button 
            onClick={onCancel} 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ff4757',
              background: 'transparent',
              color: '#ff4757',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s ease, color 0.3s ease',
              '&:hover': { background: '#ff4757', color: '#fff' }
            }}
          >
            CANCEL MISSION
          </button>
        </div>

      </div>
    </div>
  );
};

export default FocusTimerView;
import React from 'react';

const ResultSubTargetList = ({ 
  subTargets = [], 
  completedIds = [], // デフォルト値を空配列に設定 (NaN/Undefined対策)
  updates = [], 
  onToggle, 
  onValueChange 
}) => {
  // サブターゲットがない場合は何も表示しない
  if (!subTargets || subTargets.length === 0) return null;

  return (
    <section>
      <label style={{ 
        display: 'block', 
        fontSize: '0.75rem', 
        color: '#94a3b8', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        letterSpacing: '1px'
      }}>
        SUB-TARGET PROGRESS
      </label>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {subTargets.map(st => {
          // completedIds が undefined でもエラーにならないようガード
          const isCompleted = (completedIds || []).includes(st.id);
          
          return (
            <div key={st.id} style={{ 
              background: '#0f172a', 
              padding: '15px', 
              borderRadius: '12px', 
              border: isCompleted ? '2px solid #3b82f6' : '2px solid #1e293b',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: st.type === 'count' ? '10px' : '0' 
              }}>
                {/* ★ 修正ポイント: name と text の両方をチェックして表示 */}
                <span style={{ 
                  fontWeight: 'bold', 
                  color: isCompleted ? '#fff' : '#cbd5e1',
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  opacity: isCompleted ? 0.6 : 1
                }}>
                  {st.name || st.text || 'Untitled Target'}
                </span>
                
                <input 
                  type="checkbox" 
                  checked={isCompleted} 
                  onChange={() => onToggle(st.id)}
                  style={{ 
                    width: '22px', 
                    height: '22px', 
                    accentColor: '#3b82f6', 
                    cursor: 'pointer' 
                  }}
                />
              </div>

              {st.type === 'count' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="number" 
                    // updates が undefined の場合も考慮
                    value={updates?.find(u => u.id === st.id)?.current || 0}
                    onChange={(e) => onValueChange(st.id, e.target.value)}
                    style={{ 
                      background: '#1e293b', 
                      border: '1px solid #334155', 
                      color: 'white', 
                      padding: '5px 10px', 
                      borderRadius: '5px', 
                      width: '80px',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}> 
                    / {st.goal} {st.unit || ''}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResultSubTargetList;


// utils.js
export const generateHistoryData = (daysCount) => {
  const result = [];
  // 初期値を「数字」で固定
  let totalTime = 10;

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date();
    // 明示的に時間をリセットして日付のズレを防ぐ
    d.setHours(0, 0, 0, 0); 
    d.setDate(d.getDate() - i);
    
    // グラフの横軸ラベル (例: "2/14")
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    
    totalTime += 2; 
    
    result.push({ 
      day: label, 
      time: Number(totalTime), // 確実に数字として入れる
      progress: Math.min(totalTime, 100)
    });
  }
  return result;
};
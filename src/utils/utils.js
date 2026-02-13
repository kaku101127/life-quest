// utils.js
export const generateHistoryData = (daysCount) => {
  const result = [];
  let totalTime = 10;

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    
    totalTime += 2; 
    
    // ここが重要！ 'value' ではなく 'time' と 'progress' になっていること
    result.push({ 
      day: label, 
      time: totalTime,
      progress: Math.min(totalTime, 100)
    });
  }
  return result;
};
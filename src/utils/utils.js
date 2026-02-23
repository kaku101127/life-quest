// utils.js
export const generateHistoryData = (daysCount) => {
  const result = [];

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0); 
    d.setDate(d.getDate() - i);
    
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    
    result.push({ 
      day: label, 
      time: 0,        // 初期値は0
      progress: 0     // 初期値は0
    });
  }
  return result;
};
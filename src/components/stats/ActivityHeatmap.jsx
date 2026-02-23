// src/components/ActivityHeatmap.jsx
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const ActivityHeatmap = ({ data }) => {
  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginTop: '30px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1rem', color: '#666' }}>ACTIVITY HEATMAP</h3>
      <CalendarHeatmap
        startDate={new Date('2026-01-01')}
        endDate={new Date('2026-12-31')}
        values={data}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${value.count}`;
        }}
      />
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #ebedf0; }
        .react-calendar-heatmap .color-scale-1 { fill: #9be9a8; }
        .react-calendar-heatmap .color-scale-2 { fill: #40c463; }
        .react-calendar-heatmap .color-scale-3 { fill: #30a14e; }
        .react-calendar-heatmap .color-scale-4 { fill: #216e39; }
      `}</style>
    </div>
  );
};

export default ActivityHeatmap;
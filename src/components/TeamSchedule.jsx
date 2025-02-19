import React from 'react';
import { dummySchedule } from '../utils/dummySchedule';

const TeamSchedule = () => {
  return (
    <div className="schedule-container">
      <h2>Team Schedule</h2>
      {dummySchedule.map((employee) => (
        <div key={employee.id} className="schedule-card">
          <h3>{employee.name} - {employee.position}</h3>
          <div className="shifts-grid">
            {employee.shifts.map((shift, index) => (
              <div key={index} className="shift-item">
                <strong>{shift.day}:</strong> {shift.time}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSchedule; 
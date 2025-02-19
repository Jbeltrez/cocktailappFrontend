import React from 'react';
import { dummyPaystubs } from '../utils/dummyPaystubs';

const Paystubs = () => {
  return (
    <div className="paystubs-container">
      <h2>Paystubs</h2>
      <div className="paystubs-grid">
        {dummyPaystubs.map((paystub) => (
          <div key={paystub.id} className="paystub-card">
            <div className="paystub-header">
              <h3>{paystub.employeeName}</h3>
              <span className="period">{paystub.period}</span>
            </div>
            <div className="paystub-details">
              <p>Hours Worked: {paystub.hoursWorked}</p>
              <p>Regular Pay: ${paystub.regularPay.toFixed(2)}</p>
              <p>Overtime: ${paystub.overtime.toFixed(2)}</p>
              <p>Tips: ${paystub.tips.toFixed(2)}</p>
              <div className="paystub-total">
                <p>Gross Total: ${paystub.totalGross.toFixed(2)}</p>
                <p>Net Pay: ${paystub.totalNet.toFixed(2)}</p>
              </div>
              <span className="status">{paystub.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paystubs; 
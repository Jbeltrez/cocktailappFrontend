import React from 'react';
import { dummySales } from '../utils/dummySales';

const SalesReport = () => {
  return (
    <div className="sales-container">
      <h2>Sales Report</h2>
      {dummySales.map((day, index) => (
        <div key={index} className="sales-card">
          <h3>{day.date}</h3>
          <div className="sales-details">
            <div className="total-sales">
              <h4>Total Sales: ${day.totalSales.toFixed(2)}</h4>
            </div>
            <div className="breakdown">
              <h4>Breakdown:</h4>
              <p>Cocktails: ${day.breakdown.cocktails.toFixed(2)}</p>
              <p>Wine: ${day.breakdown.wine.toFixed(2)}</p>
              <p>Beer: ${day.breakdown.beer.toFixed(2)}</p>
            </div>
            <div className="top-sellers">
              <h4>Top Sellers:</h4>
              {day.topSellers.map((item, i) => (
                <p key={i}>{item.name}: {item.quantity} sold</p>
              ))}
            </div>
            <p className="peak-hours">Peak Hours: {day.peakHours}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesReport; 
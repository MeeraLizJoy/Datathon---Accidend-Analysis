import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'
const DoughnutComponent = ({value}) => {
    const data = {
        datasets: [
          {
            data: [value, 100 - value],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            borderWidth: 0,
          },
        ],
      };
    
      const options = {
        cutout: '80%',
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      };
    
      return (
        <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="overlay-content">
          <div className="large-text">{value}%</div>
          <div className="subtitle-text">Road Accidents Density</div>
        </div>
      </div>
      );
}

export default DoughnutComponent
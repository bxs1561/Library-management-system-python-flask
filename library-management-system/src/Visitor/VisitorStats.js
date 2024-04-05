import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const VisitorStats = () => {
  // Mock data (replace with real data from API or database)
  const [visitData, setVisitData] = useState({
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Library Visits',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56],
      },
    ],
  });

  // Fetch data from API or database
  useEffect(() => {
    // Example fetch call
    // fetch('api/library/visits')
    //   .then(response => response.json())
    //   .then(data => setVisitData(data))
    //   .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    // <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
    //   <h2 style={{fontSize: '15px', margin: '0'}}>Visitor Stats</h2>
    //   <div style={{ width: '100%', margin: '0' }}>
    //     <Bar
    //       data={visitData}
          
    //       height="300px"
    //       width="300px"
    //                 options={{
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //           yAxes: [
    //             {
    //               ticks: {
    //                 beginAtZero: true,
    //               },
    //             },
    //           ],
    //         },
    //       }}
    //     />
    //   </div>
     
    // </div>
    <div className="graph___container">
  <h2>Visitor Stats</h2>
  <div style={{ width: '50%', margin: '0' }}>
    <Bar
      data={visitData}
      height="300px"
      width="300px"
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  </div>
</div>

  );
};

export default VisitorStats;

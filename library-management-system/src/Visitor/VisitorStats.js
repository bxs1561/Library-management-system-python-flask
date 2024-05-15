import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogEvebt } from '../Redux/Action/UsersAction';

const VisitorStats = () => {

  const [stats, setStats] = useState([]);
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');

  const  {log}  = useSelector((state) => state.getLogEvent);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLogEvebt())
  }, [dispatch]);


  useEffect(() => {
      const date = log.map(lg => lg.date);
      const count = log.map(lg => lg.count);
      setDate(date)
      setCount(count)
  }, [log,stats]);



  return (
    <div className="graph___container">
    <h2>Visitor Stat</h2>
    <div style={{ width: '50%', margin: '0' }}>
      <Line
        data={{
          labels:date,
          datasets: [
            {
              label: 'count',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: count,
    

            }
          ]
        }}
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

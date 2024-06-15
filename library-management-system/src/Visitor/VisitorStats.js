import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogEvent } from '../redux/action/usersAction';

/**
 * Weekly visitor stat graph.
 */
const VisitorStats = () => {
  const dispatch = useDispatch()
  const  {log}  = useSelector((state) => state.getLogEvent);

  const [stats, setStats] = useState([]);
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');


  useEffect(() => {
    dispatch(fetchLogEvent())
  }, [dispatch]);


  useEffect(() => {
    const date = log.map(lg => lg.date);
    const count = log.map(lg => lg.count);
    setDate(date)
    setCount(count)
  }, [log,stats]);
  

  return (
    <div className="graph___container">
      <h2 style={{fontSize:"20px",textAlign:"center"}}>Visitor Stat</h2>
      <div style={{ margin: '0' }}>
        <Line
          data={{
            labels:date,
            datasets: [
              {
                label: 'count',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: count,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill:false,
              }
            ]
          }}
          height="300px"
          width="300px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Visitor Stat',
              },
            },
            
          }}
        />
      </div>
    </div>
  );
};

export default VisitorStats;

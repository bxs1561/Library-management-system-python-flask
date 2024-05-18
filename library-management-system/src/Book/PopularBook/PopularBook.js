import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { popularBook } from '../../Redux/Action/BooksAction';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const PopularBooks = () => {
  // State to store the list of popular books
  const [popularBooks, setPopularBooks] = useState([]);
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');

  const  {checkoutBook}  = useSelector((state) => state.getPopularBook);

  const dispatch = useDispatch()


  

  useEffect(() => {
    dispatch(popularBook())
  }, [dispatch]);

  useEffect(() => {
        const labels = checkoutBook.map(book => book.title);
        const data = checkoutBook.map(book => book.checkout_count);
        setLabel(labels)
        setTitle(data)
  }, [checkoutBook,popularBooks]);
  

  

  return (
      <div className="graph___container">
    <h2 style={{fontSize:"20px", textAlign:"center"}}>Popular Book</h2>
    <div style={{ margin: '0' }}>
      <Bar
        data={{
          labels:label,
          datasets: [
            {
              label: 'count',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: title,
    

            }
          ]
        }}
        height="300px"
        width="300px"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: true,
          //       },
          //     },
          //   ],
          // },
        }}
      />
    </div>
  </div>
  
    );
   
  
  };

export default PopularBooks;


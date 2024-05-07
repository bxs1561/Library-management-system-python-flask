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

  

    // Mock data (replace with real data from API or database)
    // const [popularBooks, setPopularBooks] = useState({
    //   labels: [],
    //   datasets: [
    //     {
          // label: 'Library Visits',
          // backgroundColor: 'rgba(0, 255, 0, 0.5)',
          // borderColor: 'rgba(75,192,192,1)',
          // borderWidth: 1,
          // hoverBackgroundColor: 'rgba(75,192,192,0.4)',
          // hoverBorderColor: 'rgba(75,192,192,1)',
          // data: [],
    //     },
    //   ],
    // });

    

    useEffect(() => {
      // if (checkoutBook && checkoutBook.length > 0) {
        const labels = checkoutBook.map(book => book.title);
        const data = checkoutBook.map(book => book.checkout_count);
        setLabel(labels)
        setTitle(data)
      //   setPopularBooks(prevState => ({
      //     ...prevState,
      //     labels: labels,
      //     datasets: [{
      //       ...prevState.datasets[0],
      //       data: data,
      //     }],
      //   }));
      // }
    }, [checkoutBook,popularBooks]);
  

  

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
    <h2>Popular Book</h2>
    <div style={{ width: '50%', margin: '0' }}>
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

export default PopularBooks;

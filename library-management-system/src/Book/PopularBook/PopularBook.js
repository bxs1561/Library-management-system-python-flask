import React, { useState, useEffect } from 'react';

const PopularBooks = () => {
  // State to store the list of popular books
  const [popularBooks, setPopularBooks] = useState([]);

  // Effect to fetch and update the list of popular books
  useEffect(() => {
    // Mock data for popular books (replace with actual API call)
    const popularBooksData = [
      { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee',borrow:1 },
      { id: 2, title: '1984', author: 'George Orwell',borrow:2 },
      { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',borrow:3 },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen',borrow:4 },
      { id: 5, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling',borrow:5 }
    ];

    // Update the state with the fetched data
    setPopularBooks(popularBooksData);
  }, []);

  return (
    <div>
      <h2>Popular Books</h2>
      <ul>
        {popularBooks.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBooks;

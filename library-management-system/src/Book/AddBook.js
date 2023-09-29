import React, {useEffect, useState} from "react";
import "./AddBook.css"

function AddBook() {
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState(null)
    const loadFile = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
        }
       }
       

       return (
        <div className="container">
          <div className="book___container">
            <div className="heading">
              <strong>Add Book</strong>

            </div>
    
            <div className="book___body">
              <div className="book___information">
                <div className="book___isbn">
                  <label>ISBN *</label>
                  <input
                    placeholder="Enter ISBN"
                    type="text"
                    value={isbn}
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___author">
                  <label>Author Name</label>
                  <input
                    placeholder="Enter Author Name"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___title">
                  <label>Book Title</label>
                  <input
                    placeholder="Enter Book Title"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___category">
                  <label>Book Category</label>
                  <input
                    placeholder="Enter Book Category"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___genre">
                  <label>Book Genre</label>
                  <input
                    placeholder="Enter Book Genre"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___publisher">
                  <label>Book publisher</label>
                  <input
                    placeholder="Enter Book Genre"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___publicationyear">
                  <label>Book publication year</label>
                  <input
                    placeholder="Enter Book Genre"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___image">
              <label  className="image___label">
                Upload Book Image
              </label>
              <input
                type="file"
                accept=".image/*"
                name="image"
                id="file"
                onChange={loadFile}
              />
            </div>
            <div className="book___quantity">
                  <label>Book quantity</label>
                  <input
                    placeholder="Enter Book quantity"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>
                <div className="book___description">
                  <label>Book description</label>
                  <textarea
                   rows="4"
                    placeholder="Enter Book description"
                    type="text"
                    value={isbn} // Replace with the appropriate state variable
                    onChange={(event) => setIsbn(event.target.value)}
                  />
                </div>

              </div>
              <div className="button">
              <button class="primary-button">Submit</button>
              </div>

            </div>
          </div>
        </div>
      );
    }
export default AddBook;
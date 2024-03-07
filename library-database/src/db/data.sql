INSERT INTO Roles(role_id,name) VALUES
    (1,'Librarian');

INSERT INTO Users(user_id, first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id,session_key,user_status_id) VALUES
    (1, 'john', 'smith','mary','62412980c084b9ed5281401b78c5873548d30cb8d9b46c0f09fe71a6cfacd2831c2730e927a15c83919afb0a9cf0388b898cd0e88380e9191825d000494050e0','2022-1-13','224 lysander drive','585-524-1234','john@gmail.com',1,'lol',1);

INSERT INTO Books(book_id, ISBN,title,genre,publication_year,publisher,language,copies_available,total_copies,location,cover_image_url,availability_status,rating,review,author) VALUES
    (1,'1479012369010','lord of the flies','novel','12-12-2008','penguin','English',20,25,'henreitta','LordOfTheFlies.jpeg','available','5','good','karl');

INSERT INTO Librarian(librarian_id,hire_date,user_id) VALUES
    (1,'2024-1-13',1);

INSERT INTO Student(student_id,user_id,fine_balance,membership_expiry_date) VALUES
    (1,1,25.30,'2024-3-13');

INSERT INTO Admin(admin_id, user_id,librarian_id) VALUES
    (1,1,1);

INSERT INTO user_status(id, status_value) VALUES
    (1,TRUE);

INSERT INTO Checkout(checkout_id,student_id,librarian_id,book_id,checkout_date,due_date,return_date,borrow_days) VALUES
    (1,1,1,1,'2024-2-10','2024-3-13','2024-3-13',3);

INSERT INTO Reservations(reservation_id,student_id,book_id,reservation_date) VALUES
    (1,1,1,'2024-2-16');

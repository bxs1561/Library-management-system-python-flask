-- DROP TABLE IF EXISTS Books,Students,Admin,UserRoles,Transactions,Reservations;
DROP TABLE IF EXISTS Books,Users,Librarian,Student,Roles,user_status,Checkout,Reservations;

CREATE TABLE Books(
    book_id SERIAL PRIMARY KEY NOT NULL,
    ISBN VARCHAR(13) UNIQUE,
    title VARCHAR(255),
    genre VARCHAR(255),
    publication_year VARCHAR(255),
    publisher VARCHAR(255),
    language VARCHAR(255),
    copies_available INT,
    total_copies INT,
    location VARCHAR(50),
    cover_image_url VARCHAR(255),
    availability_status VARCHAR(50),
    rating VARCHAR(50),
    review  VARCHAR(50),
    user_status_id INTEGER,
    author TEXT NOT NULL
);

CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50)
);
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(255),
    date_of_birth DATE,
    address VARCHAR(255),
    phone_number VARCHAR(15),
    email VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    session_key TEXT
);

CREATE TABLE Librarian(
    librarian_id SERIAL PRIMARY KEY NOT NULL,
    hire_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Student(
    student_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    fine_balance DECIMAL(10, 2),
    membership_expiry_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE user_status(
    id SERIAL PRIMARY KEY NOT NULL,
    status_value boolean
);


CREATE TABLE Checkout (
    checkout_id SERIAL PRIMARY KEY NOT NULL,
    student_id INT,
    librarian_id INT,
    book_id INT,
    checkout_date DATE,
    due_date DATE,
    return_date DATE,
    borrow_days INTEGER,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (librarian_id) REFERENCES Librarian(librarian_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Reservations (
    reservation_id SERIAL PRIMARY KEY NOT NULL,
    student_id INT,
    book_id INT,
    reservation_date DATE,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);








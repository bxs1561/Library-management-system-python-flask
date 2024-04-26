-- DROP TABLE IF EXISTS Books,Students,Admin,UserRoles,Transactions,Reservations;
DROP TABLE IF EXISTS Books,Users,Roles,Librarian,Student,Admin,user_status,Checkout,Reservations;

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
    author TEXT NOT NULL
);

CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50)
);
CREATE TABLE user_status(
    id SERIAL PRIMARY KEY NOT NULL,
    status_value boolean
);
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    password TEXT,
    date_of_birth DATE,
    address VARCHAR(255),
    phone_number VARCHAR(15),
    email VARCHAR(255),
    user_image_url VARCHAR(255),
    role_id INT,
    user_status_id INT,
    FOREIGN KEY (user_status_id) REFERENCES user_status(id),
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
CREATE TABLE Admin(
    admin_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    librarian_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (librarian_id) REFERENCES Librarian(librarian_id)
);


CREATE TABLE Checkout (
    checkout_id SERIAL PRIMARY KEY NOT NULL,
    student_id INT,
    librarian_id INT,
    book_id INT,
    checkout_date DATE,
    due_date DATE,
    return_date DATE,
    days_delay INTEGER,
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

ALTER TABLE Librarian DROP CONSTRAINT IF EXISTS librarian_user_id_fkey;
ALTER TABLE Student DROP CONSTRAINT IF EXISTS student_user_id_fkey;
ALTER TABLE Admin DROP CONSTRAINT IF EXISTS admin_user_id_fkey;
ALTER TABLE Reservations DROP CONSTRAINT IF EXISTS reservations_student_id_fkey;
ALTER TABLE Checkout DROP CONSTRAINT IF EXISTS checkout_student_id_fkey;
ALTER TABLE Users DROP CONSTRAINT IF EXISTS users_role_id_fkey;








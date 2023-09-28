DROP TABLE IF EXISTS Books,Students,Admin,UserRoles,Transactions,Reservations;

CREATE TABLE Books(
    BookID INT PRIMARY KEY,
    ISBN VARCHAR(13) UNIQUE,
    Title VARCHAR(255),
    Subtitle VARCHAR(255),
    GenreID INT,
    PublicationYear INT,
    PublisherID INT,
    LanguageID INT,
    Description TEXT,
    CopiesAvailable INT,
    TotalCopies INT,
    ShelfLocation VARCHAR(50),
    CoverImageURL VARCHAR(255),
    CoverImageURL VARCHAR(255),
    author TEXT NOT NULL,
);

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    Address VARCHAR(255),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(255),
    StudentIDNumber VARCHAR(50) UNIQUE,
    MembershipExpiryDate DATE,
    FineBalance DECIMAL(10, 2)
);

CREATE TABLE Admin (
    AdminID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    Address VARCHAR(255),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(255),
    HireDate DATE,
    Role VARCHAR(50),
    session_key TEXT

);
CREATE TABLE UserRoles (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50)
);

CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    StudentID INT,
    AdminID INT,
    BookID INT,
    TransactionType ENUM('Checkout', 'Return'),
    TransactionDate DATE,
    DueDate DATE,
    ReturnDate DATE,
    FineAmount DECIMAL(10, 2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY,
    StudentID INT,
    BookID INT,
    ReservationDate DATE,
    PickupDate DATE,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);








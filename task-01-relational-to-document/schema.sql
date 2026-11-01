-- Lab Sheet 2: Task 1 - Relational Model in MySQL
CREATE DATABASE IF NOT EXISTS CollegeDB;
USE CollegeDB;

DROP TABLE IF EXISTS Student;

CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    course VARCHAR(80) NOT NULL,
    semester TINYINT NOT NULL,
    marks DECIMAL(5, 2) NOT NULL
);

-- Insert at least 5 student records
INSERT INTO Student (student_id, name, email, course, semester, marks) VALUES
(101, 'Asha Sharma', 'asha@example.edu', 'BCA', 5, 86.50),
(102, 'Ravi Kumar', 'ravi@example.edu', 'BCA', 5, 78.00),
(103, 'Pooja Verma', 'pooja@example.edu', 'MCA', 3, 91.25),
(104, 'Amit Singh', 'amit@example.edu', 'BCA', 5, 69.50),
(105, 'Neha Patel', 'neha@example.edu', 'BSc CS', 1, 84.00);

-- Display all students
SELECT * FROM Student;

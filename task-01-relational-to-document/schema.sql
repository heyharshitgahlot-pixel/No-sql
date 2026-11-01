CREATE DATABASE IF NOT EXISTS CollegeDB; USE CollegeDB;
DROP TABLE IF EXISTS Student;
CREATE TABLE Student (student_id INT PRIMARY KEY, name VARCHAR(80) NOT NULL, email VARCHAR(120) UNIQUE NOT NULL, course VARCHAR(80) NOT NULL, semester TINYINT NOT NULL, marks DECIMAL(5,2) NOT NULL);
INSERT INTO Student VALUES (1,'Asha Sharma','asha@example.edu','BCA',5,86.50),(2,'Ravi Kumar','ravi@example.edu','BCA',5,78.00);
SELECT * FROM Student;

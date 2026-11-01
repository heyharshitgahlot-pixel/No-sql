-- Lab Sheet 2: Task 5 - Cassandra Keyspace and Students Table
CREATE KEYSPACE IF NOT EXISTS CollegeDB 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE CollegeDB;

DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
    Course text,
    Student_ID int,
    Name text,
    Semester int,
    Marks double,
    PRIMARY KEY ((Course), Student_ID)
);

-- 1. Insert at least five records
INSERT INTO Students (Course, Student_ID, Name, Semester, Marks) VALUES ('BCA', 101, 'Asha Sharma', 5, 86.5);
INSERT INTO Students (Course, Student_ID, Name, Semester, Marks) VALUES ('BCA', 102, 'Ravi Kumar', 5, 78.0);
INSERT INTO Students (Course, Student_ID, Name, Semester, Marks) VALUES ('BCA', 103, 'Pooja Verma', 5, 92.0);
INSERT INTO Students (Course, Student_ID, Name, Semester, Marks) VALUES ('MCA', 201, 'Amit Singh', 3, 74.5);
INSERT INTO Students (Course, Student_ID, Name, Semester, Marks) VALUES ('BSc CS', 301, 'Neha Patel', 1, 88.0);

-- 2. Display all records
SELECT * FROM Students;

-- 3. Retrieve students from a particular course ('BCA')
SELECT * FROM Students WHERE Course = 'BCA';

-- 4. Update the marks of a student
UPDATE Students SET Marks = 89.0 WHERE Course = 'BCA' AND Student_ID = 101;

-- Verify update
SELECT * FROM Students WHERE Course = 'BCA' AND Student_ID = 101;

-- 5. Delete a student record
DELETE FROM Students WHERE Course = 'BSc CS' AND Student_ID = 301;

-- Display final records
SELECT * FROM Students;

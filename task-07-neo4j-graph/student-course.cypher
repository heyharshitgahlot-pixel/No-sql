// Lab Sheet 2: Task 7 - Neo4j Student-Course Relationship Graph

MATCH (n) DETACH DELETE n;

// 1. Create at least five students and three courses with ENROLLED_IN relationships
CREATE 
  (s1:Student {Student_ID: 'S101', name: 'Asha Sharma', semester: 5}),
  (s2:Student {Student_ID: 'S102', name: 'Ravi Kumar', semester: 5}),
  (s3:Student {Student_ID: 'S103', name: 'Pooja Verma', semester: 3}),
  (s4:Student {Student_ID: 'S104', name: 'Amit Singh', semester: 5}),
  (s5:Student {Student_ID: 'S105', name: 'Neha Patel', semester: 1}),

  (c1:Course {code: 'BCA305P', title: 'NoSQL Database Lab', credits: 4}),
  (c2:Course {code: 'BCA301', title: 'Cloud Computing', credits: 3}),
  (c3:Course {code: 'BCA302', title: 'Data Structures', credits: 4}),

  (s1)-[:ENROLLED_IN {enrolled_date: '2026-01-10'}]->(c1),
  (s1)-[:ENROLLED_IN {enrolled_date: '2026-01-10'}]->(c2),
  (s2)-[:ENROLLED_IN {enrolled_date: '2026-01-11'}]->(c1),
  (s3)-[:ENROLLED_IN {enrolled_date: '2026-01-11'}]->(c2),
  (s3)-[:ENROLLED_IN {enrolled_date: '2026-01-11'}]->(c3),
  (s4)-[:ENROLLED_IN {enrolled_date: '2026-01-12'}]->(c1),
  (s5)-[:ENROLLED_IN {enrolled_date: '2026-01-12'}]->(c3);

// 2. Display all students
MATCH (s:Student)
RETURN s.Student_ID AS Student_ID, s.name AS Name, s.semester AS Semester;

// 3. Find students enrolled in a particular course ('NoSQL Database Lab')
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course {title: 'NoSQL Database Lab'})
RETURN s.Student_ID AS Student_ID, s.name AS Name, c.title AS Course;

// 4. Display all courses taken by a particular student ('Asha Sharma')
MATCH (s:Student {name: 'Asha Sharma'})-[:ENROLLED_IN]->(c:Course)
RETURN s.name AS Student, c.code AS CourseCode, c.title AS CourseTitle, c.credits AS Credits;

// 5. Add and remove a relationship
// Add relationship:
MATCH (s:Student {Student_ID: 'S104'}), (c:Course {code: 'BCA302'})
CREATE (s)-[r:ENROLLED_IN {enrolled_date: '2026-02-01'}]->(c)
RETURN s.name, type(r), c.title;

// Remove relationship:
MATCH (s:Student {Student_ID: 'S102'})-[r:ENROLLED_IN]->(c:Course {code: 'BCA305P'})
DELETE r;

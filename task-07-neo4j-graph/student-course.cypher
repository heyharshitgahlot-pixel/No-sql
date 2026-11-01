MATCH (n) DETACH DELETE n;
CREATE (asha:Student {id:'"'"'S1'"'"',name:'"'"'Asha Sharma'"'"'}),(ravi:Student {id:'"'"'S2'"'"',name:'"'"'Ravi Kumar'"'"'}),(db:Course {code:'"'"'BCA305P'"'"',title:'"'"'NoSQL Lab'"'"'}),(java:Course {code:'"'"'BCA204'"'"',title:'"'"'Java'"'"'}),(asha)-[:ENROLLED_IN {semester:5}]->(db),(ravi)-[:ENROLLED_IN {semester:5}]->(db),(asha)-[:ENROLLED_IN {semester:4}]->(java);
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course) RETURN s.name AS student,c.code AS course ORDER BY student;
MATCH (s:Student {id:'"'"'S1'"'"'})-[:ENROLLED_IN]->(c) RETURN s,c;

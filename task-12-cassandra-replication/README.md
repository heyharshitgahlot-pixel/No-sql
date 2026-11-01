# Task 12: Cassandra peer-to-peer replication
Cassandra has no primary/secondary node: every node can accept requests and replicas are selected from the token ring. This is a conceptual walkthrough unless `nodetool status` verifies three `UN` nodes.

```sql
CREATE KEYSPACE CollegeReplicated WITH replication={'class':'NetworkTopologyStrategy','dc1':3};
USE CollegeReplicated;
CREATE TABLE Students (course text, student_id int, name text, PRIMARY KEY ((course),student_id));
INSERT INTO Students (course,student_id,name) VALUES ('BCA',1,'Asha');
CONSISTENCY QUORUM
SELECT * FROM Students WHERE course='BCA';
```

Use `nodetool getendpoints CollegeReplicated Students BCA` to inspect placement. With RF=3 and QUORUM, two replicas must respond.

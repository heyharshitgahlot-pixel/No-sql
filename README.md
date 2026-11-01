# BCA305P NoSQL Lab

Student-friendly examples for all 15 BCA305P NoSQL tasks. Practical single-node services are provided for MongoDB, Redis, Cassandra, and Neo4j; distributed tasks are explicitly labelled conceptual unless every node is started and verified.

## Prerequisites
Docker Desktop/Compose v2, Git, Node.js 18+, and optional clients: `mysql`, `mongosh`, `redis-cli`, `cqlsh`, `cypher-shell`, HBase shell. Start services with `docker compose up -d`; install the Node driver once with `npm install mongodb`.

## Tasks
1. `task-01-relational-to-document`: MySQL Student table, equivalent MongoDB document, comparison.
2. `task-02-mongodb-crud`: CollegeDB Students CRUD and count.
3. `task-03-mongodb-orders`: Embedded customer/products and aggregation.
4. `task-04-redis-key-value`: Student strings, hash, list, set, expiry.
5. `task-05-cassandra-crud`: Students CRUD and course-partition query.
6. `task-06-hbase`: Personal/academic families and CRUD.
7. `task-07-neo4j-graph`: Student-Course graph and Cypher.
8. `task-08-database-comparison`: MongoDB/Cassandra/Neo4j comparison.
9. `task-09-mongodb-single-server`: Local single-server deployment and CRUD.
10. `task-10-mongodb-sharding`: 24-record seed, shard-key commands, explanation.
11. `task-11-mongodb-replication`: Three-member replica set and failover walkthrough.
12. `task-12-cassandra-replication`: Peer-to-peer RF/quorum walkthrough.
13. `task-13-sharding-replication`: Combined architecture and demo checklist.
14. `task-14-mapreduce`: Student counts and average marks by course.
15. `task-15-architecture-study`: Distribution models, failure handling, pros/cons/applications.

Run commands from each task directory; each README lists expected observations. A configuration file alone does not prove sharding, replication, or failover. The QR/link placeholder for submission is `https://github.com/<student-or-group>/<repository>/tree/main`; publish the repo, generate a QR code offline, and place it on the cover page.

Cleanup: `docker compose down -v`.

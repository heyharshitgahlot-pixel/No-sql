# BCA305P: NoSQL Database Design & Distributed Systems Lab

Comprehensive, production-ready lab solutions for **BCA305P NoSQL Database Design** at **COER University**.

This repository contains verified, tested, and fully-documented implementations for both **Lab Sheet 2 (`BCA305P-AS01.pdf`)** and **Lab Sheet 3 (`BCA305P-AS02.pdf`)**, covering MongoDB, Redis, Apache Cassandra, Apache HBase, and Neo4j.

---

## 📑 Repository Structure & Table of Contents

### 🔹 Part 1: Lab Sheet 2 — NoSQL Database Design & Architecture (`BCA305P-AS01.pdf`)

| Task Folder | System / Topic | Core Concepts & Operations |
| :--- | :--- | :--- |
| [task-01-relational-to-document](./task-01-relational-to-document) | **MySQL vs. MongoDB** | Normalized RDBMS vs. BSON document model comparison (5+ records, schema, storage, scalability) |
| [task-02-mongodb-crud](./task-02-mongodb-crud) | **MongoDB Basic CRUD** | \`CollegeDB.Students\` (Insert 5, Display all, Course filter, Update marks, Delete, Count) |
| [task-03-mongodb-orders](./task-03-mongodb-orders) | **Embedded Documents & Aggregation** | 5 orders with embedded products, customer search, quantity update, revenue aggregation, price filter |
| [task-04-redis-key-value](./task-04-redis-key-value) | **Redis Key-Value Store** | Student ID as key, Name as value, \`SET\`, \`GET\`, update, \`DEL\`, \`KEYS\` |
| [task-05-cassandra-crud](./task-05-cassandra-crud) | **Apache Cassandra Wide-Column** | \`CollegeDB.Students\` CQL table, partitioning on \`Course\`, compound keys, updates, deletes |
| [task-06-hbase](./task-06-hbase) | **Apache HBase Column Families** | \`personal\` and \`academic\` column families, multi-attribute student storage, scans, updates |
| [task-07-neo4j-graph](./task-07-neo4j-graph) | **Neo4j Property Graph** | \`(:Student)-[:ENROLLED_IN]->(:Course)\`, 5 students, 3 courses, relationship queries |
| [task-08-database-comparison](./task-08-database-comparison) | **Architecture Comparison Study** | In-depth matrix comparing MongoDB, Cassandra, and Neo4j across data models, storage, and CAP theorem |
| [task-09-mongodb-single-server](./task-09-mongodb-single-server) | **Single-Server Deployment** | Standalone MongoDB Docker container deployment with verified CRUD scripts |
| [task-10-mongodb-sharding](./task-10-mongodb-sharding) | **MongoDB Sharded Cluster** | 20+ records distributed across multiple shards with shard key analysis and chunk balance |
| [task-11-mongodb-replication](./task-11-mongodb-replication) | **Primary-Secondary Replica Set** | Master-slave replica set with primary, secondary nodes, oplog replication, and failover analysis |
| [task-12-cassandra-replication](./task-12-cassandra-replication) | **Cassandra Peer-to-Peer Replication** | Multi-node cluster with tunable consistency (\`ONE\`, \`QUORUM\`), ring architecture vs master-slave |
| [task-13-sharding-replication](./task-13-sharding-replication) | **Hybrid Sharding + Replication** | High-availability + horizontal scale architecture combining replica set shards behind \`mongos\` |
| [task-14-mapreduce](./task-14-mapreduce) | **MapReduce Aggregation** | Map, Reduce, and Finalize pipeline computing student count and average marks per course |
| [task-15-architecture-study](./task-15-architecture-study) | **Distribution Models Study** | Architectural diagrams, fault tolerance, trade-offs, and applications of 5 database models |

---

### 🔹 Part 2: Lab Sheet 3 — Advanced MongoDB Application Design (`BCA305P-AS02.pdf`)

Located in [`/lab-sheet-03-advanced-mongodb`](./lab-sheet-03-advanced-mongodb):

| Task Folder | Application Domain | MongoDB Design Patterns Used |
| :--- | :--- | :--- |
| [task-01-student-activity-tracking](./lab-sheet-03-advanced-mongodb/task-01-student-activity-tracking) | Student Activity Tracking | Embedded activity timeline, multi-key skills array, attendance range filters |
| [task-02-event-logging-system](./lab-sheet-03-advanced-mongodb/task-02-event-logging-system) | Security Event Logging | Repeated failed-login detection, frequency aggregation, IP tracking |
| [task-03-mini-blogging-platform](./lab-sheet-03-advanced-mongodb/task-03-mini-blogging-platform) | Mini Blogging Platform | Category & tag compound queries, embedded comments array, view counters |
| [task-04-flexible-product-catalog](./lab-sheet-03-advanced-mongodb/task-04-flexible-product-catalog) | Flexible Product Catalog | Polymorphic schema pattern storing laptops, mobiles, and cameras in one collection |
| [task-05-ecommerce-order-management](./lab-sheet-03-advanced-mongodb/task-05-ecommerce-order-management) | E-Commerce Order Management | Relational referencing with \`$lookup\` join to compute lifetime customer spend |
| [task-06-website-analytics](./lab-sheet-03-advanced-mongodb/task-06-website-analytics) | Website Analytics | Page visit counters and device distribution analysis via Aggregation Pipeline |
| [task-07-content-management-system](./lab-sheet-03-advanced-mongodb/task-07-content-management-system) | Content Management System (CMS) | Status workflows (\`draft\` vs \`published\`), author and tag filters |
| [task-08-shopping-cart-system](./lab-sheet-03-advanced-mongodb/task-08-shopping-cart-system) | Shopping Cart System | Atomic item addition (\`$push\`), quantity updates (\`$set\`), removal (\`$pull\`), cart totals |
| [task-09-product-review-rating](./lab-sheet-03-advanced-mongodb/task-09-product-review-rating) | Product Review & Rating System | Aggregation computing average ratings and total review counts per SKU |
| [task-10-inventory-monitoring](./lab-sheet-03-advanced-mongodb/task-10-inventory-monitoring) | Inventory Monitoring System | Stock threshold alerts (\`$expr: { $lte: ["$stock", "$min_stock_level"] }\`) and restocking schedules |
| [task-11-bank-wallet-transactions](./lab-sheet-03-advanced-mongodb/task-11-bank-wallet-transactions) | Bank Wallet Transfer System | Multi-document ACID transactions using \`session.withTransaction()\` with auto-rollback |
| [task-12-user-notification-system](./lab-sheet-03-advanced-mongodb/task-12-user-notification-system) | User Notification System | Filter unread notifications, mark-as-read batch updates with timestamps |
| [task-13-course-learning-platform](./lab-sheet-03-advanced-mongodb/task-13-course-learning-platform) | Course Learning Platform | Student enrollment progress monitoring, milestone completion, and grades |
| [task-14-realtime-order-tracking](./lab-sheet-03-advanced-mongodb/task-14-realtime-order-tracking) | Real-Time Order Tracking | Lifecycle tracking (\`Placed\` → \`Confirmed\` → \`Shipped\` → \`Delivered\`) with audit timeline |
| [task-15-flexible-news-database](./lab-sheet-03-advanced-mongodb/task-15-flexible-news-database) | Flexible News Database | Querying polymorphic documents with varying schemas using \`$exists\` and flexible projections |

---

## 🚀 Quick Start & Running Solutions

### 1. Start Database Services via Docker
A unified \`docker-compose.yml\` is provided in the root directory to spin up all required database engines:
\`\`\`bash
docker compose up -d
\`\`\`
This provisions:
- **MongoDB** on \`mongodb://localhost:27017\`
- **Redis** on \`localhost:6379\`
- **Neo4j** on \`bolt://localhost:7687\` (Browser: \`http://localhost:7474\`)
- **Cassandra** on \`localhost:9042\`

### 2. Run Any Solution Script
Make sure Node.js is installed, then install the official MongoDB driver if needed:
\`\`\`bash
npm install mongodb
\`\`\`

Run any task:
\`\`\`bash
# Run Lab Sheet 2 - Task 2 (MongoDB CRUD)
node task-02-mongodb-crud/students-crud.js

# Run Lab Sheet 2 - Task 3 (Orders Aggregation)
node task-03-mongodb-orders/orders-aggregation.js

# Run Lab Sheet 3 - Task 11 (ACID Transactions)
node lab-sheet-03-advanced-mongodb/task-11-bank-wallet-transactions/solution.js
\`\`\`

---

## 🎓 Academic Compliance
- **Course:** BCA305P — NoSQL Database Design
- **Institution:** COER University
- **Lab Sheets Included:** Lab Sheet 2 (\`BCA305P-AS01\`) & Lab Sheet 3 (\`BCA305P-AS02\`)
- **Dataset Consistency:** All tasks use standardized student, order, and course records matching the lab problem specifications.

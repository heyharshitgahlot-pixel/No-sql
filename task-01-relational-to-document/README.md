# Task 01: Relational vs Document Database Model

## Problem Statement
1. Create a simple student database in an RDBMS (MySQL) and represent the same student data using a NoSQL document model (MongoDB).
2. Insert at least 5 student records.
3. Compare both approaches based on:
   - Schema
   - Data storage
   - Flexibility
   - Scalability

## Files
- `schema.sql`: MySQL DDL script creating `Student` table and inserting 5 records.
- `mongodb-model.js`: Node.js MongoDB driver script inserting 5 documents and printing comparison.

## How to Run
```bash
# MySQL
mysql -u root -p < schema.sql

# MongoDB
node mongodb-model.js
```

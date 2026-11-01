# Task 11: Bank Wallet Transfer System (MongoDB Transactions)

## Problem Statement
Implement a Bank Wallet Transfer System using MongoDB transactions. Transfer an amount between two users and ensure that both balance updates are completed atomically.

## Key Concept
Uses `session.withTransaction()` ensuring **Atomicity, Consistency, Isolation, and Durability (ACID)**. If either debit or credit fails, the entire transaction is rolled back.

## Run
```bash
node solution.js
```

# Task 8: Database comparison

| Concern | MongoDB | Cassandra | Neo4j |
|---|---|---|---|
| Model | JSON-like documents | Wide rows and partitions | Nodes and relationships |
| Best fit | Flexible nested records | High-volume predictable key queries | Connected data and paths |
| Scaling | Sharding and replica sets | Peer-to-peer partitioning/replication | Clustering and graph routing |
| Query | MQL and aggregation | CQL, query-first schema | Cypher pattern matching |
| Limitation | Joins need care | Poor ad-hoc queries/joins | Cross-partition traversal cost |

Choose MongoDB for evolving student documents, Cassandra for attendance writes by course, and Neo4j when the important question is which students connect to courses and prerequisites.

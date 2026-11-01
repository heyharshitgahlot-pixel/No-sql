# Task 08: Comparative Study of MongoDB, Cassandra, and Neo4j

## Problem Statement
Implement the same simple student-related dataset using MongoDB, Cassandra, and Neo4j. Compare their:
- Data model
- Storage structure
- Query method
- Scalability
- Suitable applications

---

## 1. Student Dataset Representation

### MongoDB (Document Model)
Documents stored in BSON format with embedded structures:
```json
{
  "_id": 101,
  "name": "Asha Sharma",
  "course": "BCA",
  "semester": 5,
  "marks": 86.5,
  "enrolled_courses": [
    { "code": "BCA305P", "title": "NoSQL Lab" },
    { "code": "BCA301", "title": "Cloud Computing" }
  ]
}
```

### Apache Cassandra (Wide-Column / Tabular Model)
Partitioned across cluster nodes via partition key (`Course`):
```sql
CREATE TABLE Students (
  Course text,
  Student_ID int,
  Name text,
  Semester int,
  Marks double,
  PRIMARY KEY ((Course), Student_ID)
);
```

### Neo4j (Property Graph Model)
Nodes and directed labeled edges:
```cypher
(:Student {id: 101, name: "Asha Sharma"})-[:ENROLLED_IN]->(:Course {code: "BCA305P", title: "NoSQL Lab"})
```

---

## 2. In-Depth Comparison Matrix

| Evaluation Criteria | MongoDB | Apache Cassandra | Neo4j |
| :--- | :--- | :--- | :--- |
| **Data Model** | Document-oriented (BSON/JSON) | Wide-column / Distributed Table | Labeled Property Graph (Nodes, Edges, Properties) |
| **Storage Structure** | WiredTiger B-Trees & cache, collection namespaces | Log-Structured Merge (LSM) Trees, SSTables, CommitLog, Memtables | Native Graph Storage (index-free adjacency, doubly-linked record pointers) |
| **Query Method** | MQL (MongoDB Query Language) & Aggregation Pipeline | CQL (Cassandra Query Language, SQL-like) | Cypher Graph Query Language (`MATCH ... RETURN`) |
| **Scalability** | Horizontal via Sharding (Range & Hash-based Shard Keys) | Masterless peer-to-peer linear horizontal scale (Consistent Hashing Ring) | Vertical scale-up for writes; Read Replicas (Causal Clustering) |
| **Consistency / CAP** | CP (Configurable tunable read/write concerns) | AP (Tunable Consistency: ONE, QUORUM, ALL) | CA / ACID compliant transactions |
| **Secondary Indexes** | Rich multi-key, geospatial, compound, text | Supported but discouraged (requires ALLOW FILTERING) | Schema index on node labels/properties |
| **Join Support** | `$lookup` stage in Aggregation pipeline | No JOINs supported (queries driven by denormalized tables) | Native graph traversals (high-speed multi-hop joins) |
| **Suitable Applications** | Content Management, Catalogs, Web Apps, Real-time APIs | High-throughput write logs, IoT telemetry, Financial time-series | Social networks, Fraud detection, Knowledge graphs, Recommendation engines |

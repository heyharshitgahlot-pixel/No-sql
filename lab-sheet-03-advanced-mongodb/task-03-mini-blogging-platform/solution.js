// Lab Sheet 3: Task 3 - Mini Blogging Platform
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("Blogs");
    await col.deleteMany({});

    const blogs = [
      {
        blog_id: "B101",
        title: "Mastering MongoDB Aggregation Framework",
        author: "Asha Sharma",
        category: "Databases",
        tags: ["NoSQL", "MongoDB", "DataEngineering"],
        comments: [
          { user: "Ravi", comment: "Great breakdown of $group stage!", rating: 5 },
          { user: "Amit", comment: "Helped a lot for my lab exam.", rating: 5 }
        ],
        views: 1250,
        published_at: new Date("2026-01-15")
      },
      {
        blog_id: "B102",
        title: "Comparing Cassandra vs MongoDB for Time-Series",
        author: "Asha Sharma",
        category: "Databases",
        tags: ["NoSQL", "Cassandra", "BigData"],
        comments: [
          { user: "Pooja", comment: "Very thorough comparison.", rating: 4 }
        ],
        views: 890,
        published_at: new Date("2026-01-20")
      },
      {
        blog_id: "B103",
        title: "Introduction to Docker Containers",
        author: "Ravi Kumar",
        category: "DevOps",
        tags: ["Docker", "DevOps", "Containers"],
        comments: [],
        views: 450,
        published_at: new Date("2026-02-01")
      },
      {
        blog_id: "B104",
        title: "Graph Databases with Neo4j and Cypher",
        author: "Pooja Verma",
        category: "Databases",
        tags: ["NoSQL", "Neo4j", "GraphDB"],
        comments: [
          { user: "Asha", comment: "Cypher syntax examples are very clear.", rating: 5 }
        ],
        views: 1100,
        published_at: new Date("2026-02-05")
      }
    ];

    await col.insertMany(blogs);
    console.log("=== Mini Blogging Platform ===");
    console.log("Inserted blog posts.\n");

    console.log("1. Blogs in category 'Databases' tagged with 'NoSQL':");
    const filteredBlogs = await col.find(
      { category: "Databases", tags: "NoSQL" },
      { projection: { _id: 0, blog_id: 1, title: 1, author: 1, views: 1 } }
    ).toArray();
    console.table(filteredBlogs);

    console.log("\n2. Blogs with at least 1 comment:");
    const commentedBlogs = await col.find(
      { "comments.0": { $exists: true } },
      { projection: { _id: 0, title: 1, commentCount: { $size: "$comments" } } }
    ).toArray();
    console.table(commentedBlogs);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

// Lab Sheet 3: Task 7 - Content Management System (CMS)
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("CMSArticles");
    await col.deleteMany({});

    const articles = [
      { article_id: "A1", title: "Getting Started with NoSQL", author: "Asha Sharma", categories: ["Tech", "Tutorial"], tags: ["nosql", "mongodb"], status: "published", published_at: new Date("2026-01-05") },
      { article_id: "A2", title: "Advanced Sharding Strategies", author: "Ravi Kumar", categories: ["Architecture"], tags: ["mongodb", "scalability"], status: "draft", published_at: null },
      { article_id: "A3", title: "Next-Gen Web Frameworks", author: "Pooja Verma", categories: ["Tech", "Web"], tags: ["react", "nodejs"], status: "published", published_at: new Date("2026-02-01") },
      { article_id: "A4", title: "Database Internals: LSM Trees", author: "Asha Sharma", categories: ["Database"], tags: ["cassandra", "lsm"], status: "draft", published_at: null }
    ];

    await col.insertMany(articles);
    console.log("=== Content Management System (CMS) ===");

    console.log("\n1. Published Articles:");
    const published = await col.find({ status: "published" }, { projection: { _id: 0, title: 1, author: 1, status: 1, published_at: 1 } }).toArray();
    console.table(published);

    console.log("\n2. Unpublished Drafts Pending Review:");
    const drafts = await col.find({ status: "draft" }, { projection: { _id: 0, title: 1, author: 1, status: 1 } }).toArray();
    console.table(drafts);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

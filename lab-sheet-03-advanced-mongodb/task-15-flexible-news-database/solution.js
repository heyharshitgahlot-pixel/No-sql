// Lab Sheet 3: Task 15 - Flexible News Database (Polymorphic News Articles)
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("NewsArticles");
    await col.deleteMany({});

    // News articles with varying field structures
    const articles = [
      {
        article_id: "NEWS_01",
        headline: "Global AI Summit Concludes in Tokyo",
        category: "Technology",
        author: { name: "Kenji Sato", bureau: "Tokyo" },
        tags: ["AI", "Tech", "Innovation"],
        images: ["summit_keynote.jpg", "panel_discussion.jpg"],
        published_at: new Date()
      },
      {
        article_id: "NEWS_02",
        headline: "Flash Floods Alert Issued for Coastal Belt",
        category: "Weather",
        location: { state: "Kerala", severity: "High" },
        sources: ["National Disaster Management", "Meteorology Dept"],
        breaking_news: true,
        published_at: new Date()
      },
      {
        article_id: "NEWS_03",
        headline: "Local University Unveils Advanced Quantum Computing Lab",
        category: "Education",
        author: { name: "Dr. R. K. Sharma" },
        location: { city: "Roorkee", university: "COER University" },
        tags: ["Quantum", "Research", "Education"],
        images: ["lab_opening.jpg"],
        sources: ["Press Release"],
        published_at: new Date()
      }
    ];

    await col.insertMany(articles);
    console.log("=== Flexible News Database (Varied Document Structure) ===");

    console.log("\n1. Find Breaking News Articles:");
    const breaking = await col.find({ breaking_news: true }, { projection: { _id: 0, headline: 1, category: 1, location: 1 } }).toArray();
    console.table(breaking);

    console.log("\n2. Find Articles that have an embedded 'images' gallery:");
    const withImages = await col.find({ images: { $exists: true, $ne: [] } }, { projection: { _id: 0, headline: 1, category: 1, imageCount: { $size: "$images" } } }).toArray();
    console.table(withImages);

    console.log("\n3. Find Articles that have location details:");
    const withLocation = await col.find({ location: { $exists: true } }, { projection: { _id: 0, headline: 1, location: 1 } }).toArray();
    console.dir(withLocation, { depth: null });

  } finally {
    await client.close();
  }
}
main().catch(console.error);

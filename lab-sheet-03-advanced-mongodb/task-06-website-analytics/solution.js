// Lab Sheet 3: Task 6 - Website Analytics System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("WebAnalytics");
    await col.deleteMany({});

    const visits = [
      { page: "/home", user: "U1", device: "Desktop", browser: "Chrome", location: "Delhi", timestamp: new Date() },
      { page: "/courses", user: "U2", device: "Mobile", browser: "Safari", location: "Mumbai", timestamp: new Date() },
      { page: "/courses", user: "U1", device: "Desktop", browser: "Chrome", location: "Delhi", timestamp: new Date() },
      { page: "/courses", user: "U3", device: "Mobile", browser: "Chrome", location: "Bangalore", timestamp: new Date() },
      { page: "/pricing", user: "U2", device: "Mobile", browser: "Safari", location: "Mumbai", timestamp: new Date() },
      { page: "/home", user: "U4", device: "Tablet", browser: "Safari", location: "Pune", timestamp: new Date() },
      { page: "/courses", user: "U5", device: "Desktop", browser: "Firefox", location: "Jaipur", timestamp: new Date() }
    ];

    await col.insertMany(visits);
    console.log("=== Website Analytics System ===");

    console.log("\n1. Top Most Visited Pages:");
    const topPages = await col.aggregate([
      { $group: { _id: "$page", visits: { $sum: 1 } } },
      { $sort: { visits: -1 } }
    ]).toArray();
    console.table(topPages.map(p => ({ Page: p._id, TotalVisits: p.visits })));

    console.log("\n2. Most Commonly Used Devices:");
    const deviceStats = await col.aggregate([
      { $group: { _id: "$device", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    console.table(deviceStats.map(d => ({ Device: d._id, TotalHits: d.count })));

  } finally {
    await client.close();
  }
}
main().catch(console.error);

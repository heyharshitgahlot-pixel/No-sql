// Lab Sheet 3: Task 10 - Inventory Monitoring System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("Inventory");
    await col.deleteMany({});

    const inventory = [
      { item_id: "INV1", name: "A4 Paper Reams", stock: 12, min_stock_level: 25, supplier: "Apex Stationery", restock_due: new Date("2026-03-01") },
      { item_id: "INV2", name: "Whiteboard Markers", stock: 50, min_stock_level: 20, supplier: "Apex Stationery", restock_due: new Date("2026-04-10") },
      { item_id: "INV3", name: "HDMI Adapters", stock: 3, min_stock_level: 10, supplier: "TechLink Supplies", restock_due: new Date("2026-02-28") },
      { item_id: "INV4", name: "Ethernet Cables (5m)", stock: 8, min_stock_level: 15, supplier: "TechLink Supplies", restock_due: new Date("2026-02-27") },
      { item_id: "INV5", name: "Ergonomic Chairs", stock: 30, min_stock_level: 5, supplier: "Comfort Seating", restock_due: new Date("2026-05-01") }
    ];

    await col.insertMany(inventory);
    console.log("=== Inventory Monitoring System ===");

    console.log("\nItems Needing Immediate Restocking (Stock <= Minimum Stock Level):");
    const needsRestock = await col.aggregate([
      {
        $match: {
          $expr: { $lte: ["$stock", "$min_stock_level"] }
        }
      },
      {
        $project: {
          _id: 0,
          item_id: 1,
          name: 1,
          stock: 1,
          min_stock_level: 1,
          deficit: { $subtract: ["$min_stock_level", "$stock"] },
          supplier: 1,
          restock_due: 1
        }
      },
      { $sort: { deficit: -1 } }
    ]).toArray();
    console.table(needsRestock);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

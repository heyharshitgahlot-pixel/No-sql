// Lab Sheet 3: Task 9 - Product Review and Rating System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("ProductReviews");
    await col.deleteMany({});

    const reviews = [
      { product_id: "P100", product_name: "Mechanical Keyboard", user: "Asha", rating: 5, comment: "Fantastic tactile feel!", date: new Date() },
      { product_id: "P100", product_name: "Mechanical Keyboard", user: "Ravi", rating: 4, comment: "Good quality, bit loud.", date: new Date() },
      { product_id: "P100", product_name: "Mechanical Keyboard", user: "Amit", rating: 5, comment: "Best keyboard for coding.", date: new Date() },
      { product_id: "P200", product_name: "Wireless Mouse", user: "Pooja", rating: 4, comment: "Smooth tracking.", date: new Date() },
      { product_id: "P200", product_name: "Wireless Mouse", user: "Neha", rating: 2, comment: "Battery drains quickly.", date: new Date() },
      { product_id: "P300", product_name: "4K Monitor", user: "Kabir", rating: 5, comment: "Stunning colors.", date: new Date() }
    ];

    await col.insertMany(reviews);
    console.log("=== Product Review and Rating System ===");

    console.log("\nAverage Rating and Total Reviews per Product (Aggregation):");
    const summary = await col.aggregate([
      {
        $group: {
          _id: "$product_id",
          productName: { $first: "$product_name" },
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          ProductID: "$_id",
          ProductName: "$productName",
          AvgRating: { $round: ["$averageRating", 2] },
          TotalReviews: "$totalReviews"
        }
      },
      { $sort: { AvgRating: -1 } }
    ]).toArray();
    console.table(summary);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

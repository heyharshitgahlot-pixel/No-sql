// Lab Sheet 3: Task 8 - Shopping Cart System using Embedded Documents
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("ShoppingCarts");
    await col.deleteMany({});

    // 1. Initialize user cart
    const userId = "USER_101";
    await col.insertOne({
      user_id: userId,
      items: [
        { product_id: "PROD_1", name: "Notebook Set", price: 250, quantity: 2 }
      ],
      updated_at: new Date()
    });
    console.log("=== Shopping Cart System ===");
    console.log("Cart initialized.\n");

    // 2. Add product to cart
    await col.updateOne(
      { user_id: userId },
      {
        $push: { items: { product_id: "PROD_2", name: "Ballpoint Pen Pack", price: 120, quantity: 1 } },
        $set: { updated_at: new Date() }
      }
    );
    console.log("Added PROD_2 to cart.");

    // 3. Change product quantity
    await col.updateOne(
      { user_id: userId, "items.product_id": "PROD_1" },
      { $set: { "items.$.quantity": 4, updated_at: new Date() } }
    );
    console.log("Updated PROD_1 quantity to 4.");

    // 4. Calculate total cart value
    const cartCalculation = await col.aggregate([
      { $match: { user_id: userId } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$user_id",
          totalItems: { $sum: "$items.quantity" },
          cartValue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
        }
      }
    ]).toArray();
    console.log("\nCart Total Value:");
    console.table(cartCalculation);

    // 5. Remove product from cart
    await col.updateOne(
      { user_id: userId },
      { $pull: { items: { product_id: "PROD_2" } } }
    );
    console.log("Removed PROD_2 from cart.");

    const finalCart = await col.findOne({ user_id: userId }, { projection: { _id: 0 } });
    console.log("Final Cart State:");
    console.dir(finalCart, { depth: null });

  } finally {
    await client.close();
  }
}
main().catch(console.error);

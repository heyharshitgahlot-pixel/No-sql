// Lab Sheet 3: Task 14 - Real-Time Order Tracking System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("RealTimeTracking");
    await col.deleteMany({});

    const initialOrder = {
      order_id: "TRACK-9001",
      customer: "Asha Sharma",
      current_status: "Placed",
      status_history: [
        { status: "Placed", timestamp: new Date("2026-02-20T10:00:00Z"), location: "Online Portal", note: "Order placed by customer." }
      ]
    };

    await col.insertOne(initialOrder);
    console.log("=== Real-Time Order Tracking System ===");
    console.log("Order created with status 'Placed'.");

    // Simulate order stage transitions: Confirmed -> Shipped -> Delivered
    const transitions = [
      { status: "Confirmed", timestamp: new Date("2026-02-20T10:30:00Z"), location: "Warehouse Delhi", note: "Payment verified and inventory allocated." },
      { status: "Shipped", timestamp: new Date("2026-02-20T14:00:00Z"), location: "Courier Hub Haridwar", note: "Package picked up by courier service." },
      { status: "Delivered", timestamp: new Date("2026-02-21T11:15:00Z"), location: "Customer Address Roorkee", note: "Delivered to recipient." }
    ];

    for (const step of transitions) {
      await col.updateOne(
        { order_id: "TRACK-9001" },
        {
          $set: { current_status: step.status },
          $push: { status_history: step }
        }
      );
    }
    console.log("Pushed real-time tracking updates (Confirmed -> Shipped -> Delivered).\n");

    const orderData = await col.findOne({ order_id: "TRACK-9001" }, { projection: { _id: 0 } });
    console.log(`Current Order Status: ${orderData.current_status}`);
    console.log("Full Tracking Timeline History:");
    console.table(orderData.status_history);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

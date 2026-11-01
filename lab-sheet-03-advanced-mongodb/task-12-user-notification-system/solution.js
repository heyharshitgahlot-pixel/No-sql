// Lab Sheet 3: Task 12 - User Notification System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("Notifications");
    await col.deleteMany({});

    const notifs = [
      { notif_id: "N1", user_id: "U101", type: "order_update", title: "Order Shipped", message: "Your order ORD_1 is out for delivery", is_read: false, created_at: new Date() },
      { notif_id: "N2", user_id: "U101", type: "system_alert", title: "Password Change", message: "Your password was updated recently", is_read: true, created_at: new Date() },
      { notif_id: "N3", user_id: "U101", type: "message", title: "New Message", message: "Professor posted marks for Lab 2", is_read: false, created_at: new Date() },
      { notif_id: "N4", user_id: "U102", type: "order_update", title: "Order Placed", message: "Order confirmed", is_read: false, created_at: new Date() }
    ];

    await col.insertMany(notifs);
    console.log("=== User Notification System ===");

    console.log("\n1. Unread notifications for user 'U101':");
    const unread = await col.find({ user_id: "U101", is_read: false }, { projection: { _id: 0 } }).toArray();
    console.table(unread);

    console.log("\n2. Marking unread notifications as read after viewing...");
    const updateResult = await col.updateMany(
      { user_id: "U101", is_read: false },
      { $set: { is_read: true, viewed_at: new Date() } }
    );
    console.log(`Marked ${updateResult.modifiedCount} notifications as read.`);

    console.log("\n3. Verified unread count for 'U101':", await col.countDocuments({ user_id: "U101", is_read: false }));

  } finally {
    await client.close();
  }
}
main().catch(console.error);

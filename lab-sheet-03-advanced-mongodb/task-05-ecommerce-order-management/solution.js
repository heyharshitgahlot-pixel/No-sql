// Lab Sheet 3: Task 5 - E-Commerce Order Management System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const customersCol = db.collection("EcomCustomers");
    const ordersCol = db.collection("EcomOrders");

    await customersCol.deleteMany({});
    await ordersCol.deleteMany({});

    await customersCol.insertMany([
      { customer_id: "CUST_01", name: "Asha Sharma", email: "asha@example.com", tier: "Gold" },
      { customer_id: "CUST_02", name: "Ravi Kumar", email: "ravi@example.com", tier: "Silver" }
    ]);

    await ordersCol.insertMany([
      { order_id: "ORD_1", customer_id: "CUST_01", date: new Date("2026-01-10"), items: [{ item: "Wireless Headphones", qty: 1, price: 4500 }], status: "Delivered" },
      { order_id: "ORD_2", customer_id: "CUST_01", date: new Date("2026-02-05"), items: [{ item: "Mechanical Keyboard", qty: 1, price: 3200 }, { item: "Mouse Pad", qty: 2, price: 400 }], status: "Delivered" },
      { order_id: "ORD_3", customer_id: "CUST_02", date: new Date("2026-02-12"), items: [{ item: "USB Hub", qty: 1, price: 1200 }], status: "Shipped" }
    ]);

    console.log("=== E-Commerce Order Management System ===");
    console.log("Customer Purchase History & Total Spent using $lookup Aggregation:\n");

    const purchaseHistory = await customersCol.aggregate([
      {
        $lookup: {
          from: "EcomOrders",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "order_history"
        }
      },
      {
        $project: {
          _id: 0,
          customer_id: 1,
          name: 1,
          tier: 1,
          total_orders: { $size: "$order_history" },
          lifetime_spend: {
            $sum: {
              $map: {
                input: "$order_history",
                as: "ord",
                in: {
                  $sum: {
                    $map: {
                      input: "$$ord.items",
                      as: "it",
                      in: { $multiply: ["$$it.qty", "$$$it.price"] }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]).toArray();

    console.table(purchaseHistory);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

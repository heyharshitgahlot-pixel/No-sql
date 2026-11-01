// Lab Sheet 2: Task 3 - Orders Collection with Embedded Products & Aggregation
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const ordersCol = db.collection("Orders");

    await ordersCol.deleteMany({ order_id: { $in: ["ORD-101", "ORD-102", "ORD-103", "ORD-104", "ORD-105"] } });

    console.log("=== 1. Insert at least 5 orders with customer & embedded products ===");
    const sampleOrders = [
      {
        order_id: "ORD-101",
        customer: { customer_id: "CUST-1", name: "Asha Sharma", email: "asha@example.com", city: "Delhi" },
        products: [
          { sku: "P01", name: "Mechanical Keyboard", quantity: 1, price: 2500 },
          { sku: "P02", name: "Wireless Mouse", quantity: 2, price: 800 }
        ],
        order_date: new Date("2026-02-01")
      },
      {
        order_id: "ORD-102",
        customer: { customer_id: "CUST-2", name: "Ravi Kumar", email: "ravi@example.com", city: "Mumbai" },
        products: [
          { sku: "P03", name: "USB-C Hub", quantity: 1, price: 1200 },
          { sku: "P04", name: "HDMI Cable", quantity: 2, price: 300 }
        ],
        order_date: new Date("2026-02-05")
      },
      {
        order_id: "ORD-103",
        customer: { customer_id: "CUST-1", name: "Asha Sharma", email: "asha@example.com", city: "Delhi" },
        products: [
          { sku: "P05", name: "27-inch Monitor", quantity: 1, price: 18000 }
        ],
        order_date: new Date("2026-02-10")
      },
      {
        order_id: "ORD-104",
        customer: { customer_id: "CUST-3", name: "Pooja Verma", email: "pooja@example.com", city: "Bangalore" },
        products: [
          { sku: "P06", name: "Laptop Stand", quantity: 2, price: 950 },
          { sku: "P02", name: "Wireless Mouse", quantity: 1, price: 800 }
        ],
        order_date: new Date("2026-02-12")
      },
      {
        order_id: "ORD-105",
        customer: { customer_id: "CUST-4", name: "Amit Singh", email: "amit@example.com", city: "Pune" },
        products: [
          { sku: "P07", name: "Noise Cancelling Headphones", quantity: 1, price: 7500 },
          { sku: "P04", name: "HDMI Cable", quantity: 1, price: 300 }
        ],
        order_date: new Date("2026-02-15")
      }
    ];

    await ordersCol.insertMany(sampleOrders);
    console.log("Inserted 5 orders.\n");

    console.log("=== 2. Display orders of a particular customer ('Asha Sharma' / CUST-1) ===");
    const customerOrders = await ordersCol.find({ "customer.customer_id": "CUST-1" }, { projection: { _id: 0 } }).toArray();
    console.dir(customerOrders, { depth: null });

    console.log("\n=== 3. Update the quantity of a product (ORD-101: increase Wireless Mouse quantity to 3) ===");
    await ordersCol.updateOne(
      { order_id: "ORD-101", "products.sku": "P02" },
      { $set: { "products.$.quantity": 3 } }
    );
    const updatedOrder = await ordersCol.findOne({ order_id: "ORD-101" }, { projection: { _id: 0, order_id: 1, products: 1 } });
    console.dir(updatedOrder, { depth: null });

    console.log("\n=== 4. Calculate total order amount for each order using aggregation ===");
    const orderTotals = await ordersCol.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$order_id",
          customerName: { $first: "$customer.name" },
          totalAmount: { $sum: { $multiply: ["$products.quantity", "$products.price"] } },
          itemCount: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]).toArray();
    console.table(orderTotals);

    console.log("\n=== 5. Display orders with total amount above a specified amount (₹4,000) ===");
    const highValueOrders = await ordersCol.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$order_id",
          customerName: { $first: "$customer.name" },
          totalAmount: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
        }
      },
      { $match: { totalAmount: { $gt: 4000 } } },
      { $sort: { totalAmount: -1 } }
    ]).toArray();
    console.table(highValueOrders);

  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});

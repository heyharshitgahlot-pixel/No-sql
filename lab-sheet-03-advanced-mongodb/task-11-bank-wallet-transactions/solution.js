// Lab Sheet 3: Task 11 - Bank Wallet Transfer System (ACID Transactions)
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const wallets = db.collection("Wallets");

    await wallets.deleteMany({});
    await wallets.insertMany([
      { account_id: "ACC_USER_A", owner: "Asha Sharma", balance: 15000 },
      { account_id: "ACC_USER_B", owner: "Ravi Kumar", balance: 3500 }
    ]);

    console.log("=== Bank Wallet Transfer System (MongoDB Transactions) ===");
    console.log("Initial Balances:");
    console.table(await wallets.find({}, { projection: { _id: 0 } }).toArray());

    const transferAmount = 5000;
    console.log(`\nExecuting atomic transfer of ₹${transferAmount} from User A to User B...`);

    // Using client session for ACID transaction
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        // Step 1: Deduct from User A
        const deduct = await wallets.updateOne(
          { account_id: "ACC_USER_A", balance: { $gte: transferAmount } },
          { $inc: { balance: -transferAmount } },
          { session }
        );
        if (deduct.modifiedCount === 0) {
          throw new Error("Insufficient balance in User A account!");
        }

        // Step 2: Credit to User B
        await wallets.updateOne(
          { account_id: "ACC_USER_B" },
          { $inc: { balance: transferAmount } },
          { session }
        );
      });
      console.log("Transaction successfully COMMITTED! Both balance updates completed atomically.");
    } catch (txErr) {
      console.error("Transaction ROLLED BACK:", txErr.message);
    } finally {
      await session.endSession();
    }

    console.log("\nFinal Balances after Transaction:");
    console.table(await wallets.find({}, { projection: { _id: 0 } }).toArray());

  } finally {
    await client.close();
  }
}
main().catch(console.error);

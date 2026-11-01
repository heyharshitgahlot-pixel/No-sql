// Lab Sheet 3: Task 2 - Event Logging System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("SecurityLogs");
    await col.deleteMany({});

    const logs = [
      { event_id: "EV101", user_id: "user_asha", event_type: "login", ip_address: "192.168.1.10", timestamp: new Date("2026-02-20T08:00:00Z"), status: "SUCCESS" },
      { event_id: "EV102", user_id: "user_ravi", event_type: "failed-login", ip_address: "203.0.113.45", timestamp: new Date("2026-02-20T08:05:00Z"), status: "FAILED", reason: "Invalid Password" },
      { event_id: "EV103", user_id: "user_ravi", event_type: "failed-login", ip_address: "203.0.113.45", timestamp: new Date("2026-02-20T08:06:00Z"), status: "FAILED", reason: "Invalid Password" },
      { event_id: "EV104", user_id: "user_ravi", event_type: "failed-login", ip_address: "203.0.113.45", timestamp: new Date("2026-02-20T08:07:00Z"), status: "FAILED", reason: "Invalid Password" },
      { event_id: "EV105", user_id: "user_asha", event_type: "file-upload", ip_address: "192.168.1.10", timestamp: new Date("2026-02-20T08:30:00Z"), file_name: "assignment1.pdf", status: "SUCCESS" },
      { event_id: "EV106", user_id: "user_pooja", event_type: "password-change", ip_address: "192.168.1.15", timestamp: new Date("2026-02-20T09:00:00Z"), status: "SUCCESS" },
      { event_id: "EV107", user_id: "user_amit", event_type: "login", ip_address: "192.168.1.20", timestamp: new Date("2026-02-20T09:15:00Z"), status: "SUCCESS" },
      { event_id: "EV108", user_id: "user_amit", event_type: "logout", ip_address: "192.168.1.20", timestamp: new Date("2026-02-20T10:00:00Z"), status: "SUCCESS" }
    ];

    await col.insertMany(logs);
    console.log("=== Event Logging System ===");
    console.log("Loaded security event logs.\n");

    console.log("1. Identify repeated failed-login attempts (Suspicious activity detection):");
    const repeatedFailed = await col.aggregate([
      { $match: { event_type: "failed-login" } },
      {
        $group: {
          _id: { user: "$user_id", ip: "$ip_address" },
          failedAttempts: { $sum: 1 },
          lastAttempt: { $max: "$timestamp" }
        }
      },
      { $match: { failedAttempts: { $gte: 2 } } }
    ]).toArray();
    console.table(repeatedFailed.map(r => ({ User: r._id.user, IP: r._id.ip, FailedAttempts: r.failedAttempts, LastAttempt: r.lastAttempt })));

    console.log("\n2. Frequently occurring events across the system:");
    const freqEvents = await col.aggregate([
      { $group: { _id: "$event_type", eventCount: { $sum: 1 } } },
      { $sort: { eventCount: -1 } }
    ]).toArray();
    console.table(freqEvents.map(e => ({ EventType: e._id, Frequency: e.eventCount })));

  } finally {
    await client.close();
  }
}
main().catch(console.error);

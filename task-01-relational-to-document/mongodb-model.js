// Lab Sheet 2: Task 1 - MongoDB Document Model & Comparison
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const collection = db.collection("Students");

    await collection.deleteMany({ Student_ID: { $in: [101, 102, 103, 104, 105] } });

    // Insert equivalent 5 student documents
    const students = [
      { Student_ID: 101, Name: "Asha Sharma", Email: "asha@example.edu", Course: "BCA", Semester: 5, Marks: 86.50 },
      { Student_ID: 102, Name: "Ravi Kumar", Email: "ravi@example.edu", Course: "BCA", Semester: 5, Marks: 78.00 },
      { Student_ID: 103, Name: "Pooja Verma", Email: "pooja@example.edu", Course: "MCA", Semester: 3, Marks: 91.25 },
      { Student_ID: 104, Name: "Amit Singh", Email: "amit@example.edu", Course: "BCA", Semester: 5, Marks: 69.50 },
      { Student_ID: 105, Name: "Neha Patel", Email: "neha@example.edu", Course: "BSc CS", Semester: 1, Marks: 84.00 }
    ];

    const result = await collection.insertMany(students);
    console.log(`Successfully inserted ${result.insertedCount} student documents into MongoDB.\n`);

    console.log("--- Retrieved Documents from MongoDB ---");
    const docs = await collection.find({ Student_ID: { $in: [101, 102, 103, 104, 105] } }, { projection: { _id: 0 } }).toArray();
    console.table(docs);

    console.log("\n--- Comparison Summary (RDBMS vs Document Model) ---");
    console.table([
      { Feature: "Schema", RDBMS: "Rigid, predefined columns (DDL alter needed)", MongoDB: "Dynamic, polymorphic JSON/BSON documents" },
      { Feature: "Data Storage", RDBMS: "Normalized tabular rows & tables", MongoDB: "Denormalized hierarchical key-value documents" },
      { Feature: "Flexibility", RDBMS: "Low (schema migrations required)", MongoDB: "High (fields can be added ad-hoc per document)" },
      { Feature: "Scalability", RDBMS: "Vertical scaling (scale-up)", MongoDB: "Horizontal scaling via native sharding (scale-out)" }
    ]);
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error("Error executing Task 1:", err);
  process.exitCode = 1;
});

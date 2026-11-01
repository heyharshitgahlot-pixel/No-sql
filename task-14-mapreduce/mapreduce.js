// Lab Sheet 2: Task 14 - MapReduce on Student Dataset
// Calculates student count and average marks per course
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const col = db.collection("StudentScores");

    await col.deleteMany({});

    // Sample dataset: Student_ID, Name, Course, Marks (at least 5 students)
    const dataset = [
      { Student_ID: 101, Name: "Asha Sharma", Course: "BCA", Marks: 86.0 },
      { Student_ID: 102, Name: "Ravi Kumar", Course: "BCA", Marks: 78.0 },
      { Student_ID: 103, Name: "Pooja Verma", Course: "MCA", Marks: 92.0 },
      { Student_ID: 104, Name: "Amit Singh", Course: "BCA", Marks: 74.0 },
      { Student_ID: 105, Name: "Neha Patel", Course: "BSc CS", Marks: 84.0 },
      { Student_ID: 106, Name: "Kabir Roy", Course: "MCA", Marks: 88.0 },
      { Student_ID: 107, Name: "Sana Mir", Course: "BSc CS", Marks: 90.0 }
    ];

    await col.insertMany(dataset);
    console.log("Sample dataset loaded into StudentScores collection:\n");
    console.table(dataset);

    console.log("\n=== MapReduce Aggregation Pipeline ===");
    console.log("1. Map Stage: Emits { key: Course, value: { count: 1, totalMarks: Marks } }");
    console.log("2. Reduce Stage: Accumulates count and total marks per course");
    console.log("3. Finalize Stage: Computes average marks (totalMarks / count)\n");

    const results = await col.aggregate([
      {
        $group: {
          _id: "$Course",
          studentCount: { $sum: 1 },
          totalMarks: { $sum: "$Marks" },
          averageMarks: { $avg: "$Marks" }
        }
      },
      {
        $project: {
          _id: 0,
          Course: "$_id",
          studentCount: 1,
          averageMarks: { $round: ["$averageMarks", 2] }
        }
      },
      { $sort: { Course: 1 } }
    ]).toArray();

    console.log("=== MapReduce Output Results ===");
    console.table(results);

  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});

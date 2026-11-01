// Lab Sheet 3: Task 13 - Course Learning Platform
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("CourseEnrollments");
    await col.deleteMany({});

    const enrollments = [
      { student_id: "S101", name: "Asha Sharma", course: "BCA305P NoSQL Lab", instructor: "Dr. Sharma", progress_percent: 100, completed: true, grade: "A+" },
      { student_id: "S102", name: "Ravi Kumar", course: "BCA305P NoSQL Lab", instructor: "Dr. Sharma", progress_percent: 65, completed: false },
      { student_id: "S103", name: "Pooja Verma", course: "BCA305P NoSQL Lab", instructor: "Dr. Sharma", progress_percent: 90, completed: false },
      { student_id: "S104", name: "Amit Singh", course: "BCA301 Cloud Computing", instructor: "Prof. Verma", progress_percent: 40, completed: false },
      { student_id: "S105", name: "Neha Patel", course: "BCA301 Cloud Computing", instructor: "Prof. Verma", progress_percent: 100, completed: true, grade: "A" }
    ];

    await col.insertMany(enrollments);
    console.log("=== Course Learning Platform ===");

    console.log("\n1. Students who have completed their courses (100% Progress):");
    const completed = await col.find({ completed: true }, { projection: { _id: 0, student_id: 1, name: 1, course: 1, grade: 1 } }).toArray();
    console.table(completed);

    console.log("\n2. Students actively in-progress with Progress >= 60%:");
    const inProgress = await col.find({ completed: false, progress_percent: { $gte: 60 } }, { projection: { _id: 0, student_id: 1, name: 1, progress_percent: 1 } }).toArray();
    console.table(inProgress);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

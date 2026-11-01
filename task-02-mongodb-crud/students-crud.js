// Lab Sheet 2: Task 2 - MongoDB CRUD Operations on CollegeDB.Students
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("CollegeDB");
    const collection = db.collection("Students");

    await collection.deleteMany({ Student_ID: { $in: [201, 202, 203, 204, 205] } });

    console.log("=== Step 0: Inserting at least 5 student documents ===");
    const sampleStudents = [
      { Student_ID: 201, Name: "Meera Nair", Course: "BCA", Semester: 5, Marks: 82.0 },
      { Student_ID: 202, Name: "Kabir Mehta", Course: "BCA", Semester: 5, Marks: 91.5 },
      { Student_ID: 203, Name: "Noor Jahan", Course: "BSc CS", Semester: 3, Marks: 76.0 },
      { Student_ID: 204, Name: "Dev Roy", Course: "MCA", Semester: 1, Marks: 88.0 },
      { Student_ID: 205, Name: "Sara Khan", Course: "BCA", Semester: 5, Marks: 67.5 }
    ];
    await collection.insertMany(sampleStudents);
    console.log("Inserted 5 student documents.\n");

    console.log("=== 1. Display all documents ===");
    const allStudents = await collection.find({ Student_ID: { $in: [201, 202, 203, 204, 205] } }, { projection: { _id: 0 } }).toArray();
    console.table(allStudents);

    console.log("\n=== 2. Find students from a particular course ('BCA') ===");
    const bcaStudents = await collection.find({ Course: "BCA" }, { projection: { _id: 0 } }).toArray();
    console.table(bcaStudents);

    console.log("\n=== 3. Update marks of a student (Student_ID: 201) ===");
    const updateResult = await collection.updateOne({ Student_ID: 201 }, { $set: { Marks: 89.5 } });
    console.log(`Modified count: ${updateResult.modifiedCount}`);
    const updatedStudent = await collection.findOne({ Student_ID: 201 }, { projection: { _id: 0 } });
    console.log("Updated record:", updatedStudent);

    console.log("\n=== 4. Delete one student (Student_ID: 203) ===");
    const deleteResult = await collection.deleteOne({ Student_ID: 203 });
    console.log(`Deleted count: ${deleteResult.deletedCount}`);

    console.log("\n=== 5. Count the total number of students in CollegeDB ===");
    const totalCount = await collection.countDocuments();
    console.log(`Total remaining students in collection: ${totalCount}`);

  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});

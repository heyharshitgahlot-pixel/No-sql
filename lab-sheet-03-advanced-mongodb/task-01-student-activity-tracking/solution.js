// Lab Sheet 3: Task 1 - Student Activity Tracking System
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("StudentActivities");
    await col.deleteMany({});

    const students = [
      {
        student_id: "S101",
        name: "Asha Sharma",
        enrolled_courses: ["NoSQL Databases", "Cloud Computing"],
        attendance_percentage: 92.5,
        skills: ["MongoDB", "Docker", "Node.js"],
        recent_activities: [
          { type: "quiz", course: "NoSQL Databases", score: 95, date: new Date("2026-02-10") },
          { type: "assignment", course: "Cloud Computing", status: "submitted", date: new Date("2026-02-14") }
        ]
      },
      {
        student_id: "S102",
        name: "Ravi Kumar",
        enrolled_courses: ["NoSQL Databases", "Python Programming"],
        attendance_percentage: 74.0,
        skills: ["Python", "MySQL"],
        recent_activities: [
          { type: "quiz", course: "Python Programming", score: 68, date: new Date("2026-02-08") }
        ]
      },
      {
        student_id: "S103",
        name: "Pooja Verma",
        enrolled_courses: ["Web Development", "Cloud Computing"],
        attendance_percentage: 88.0,
        skills: ["React", "Node.js", "MongoDB"],
        recent_activities: [
          { type: "hackathon", title: "Smart City Hackathon", rank: 2, date: new Date("2026-02-12") }
        ]
      },
      {
        student_id: "S104",
        name: "Amit Singh",
        enrolled_courses: ["NoSQL Databases"],
        attendance_percentage: 65.0,
        skills: ["Java", "SQL"],
        recent_activities: [
          { type: "seminar", topic: "Big Data Architectures", attended: true, date: new Date("2026-02-01") }
        ]
      },
      {
        student_id: "S105",
        name: "Neha Patel",
        enrolled_courses: ["Machine Learning", "Python Programming"],
        attendance_percentage: 95.0,
        skills: ["Python", "TensorFlow", "MongoDB"],
        recent_activities: [
          { type: "project_demo", course: "Machine Learning", score: 98, date: new Date("2026-02-15") }
        ]
      }
    ];

    await col.insertMany(students);
    console.log("=== Student Activity Tracking System ===");
    console.log("Inserted 5 student activity profiles.\n");

    console.log("1. Students with Attendance > 85%:");
    const highAttendance = await col.find({ attendance_percentage: { $gt: 85 } }, { projection: { _id: 0, student_id: 1, name: 1, attendance_percentage: 1 } }).toArray();
    console.table(highAttendance);

    console.log("\n2. Students possessing 'MongoDB' skill:");
    const mongoStudents = await col.find({ skills: "MongoDB" }, { projection: { _id: 0, student_id: 1, name: 1, skills: 1 } }).toArray();
    console.table(mongoStudents);

    console.log("\n3. Students who participated in Quiz activities:");
    const quizStudents = await col.find({ "recent_activities.type": "quiz" }, { projection: { _id: 0, student_id: 1, name: 1, "recent_activities.$": 1 } }).toArray();
    console.dir(quizStudents, { depth: null });

  } finally {
    await client.close();
  }
}
main().catch(console.error);

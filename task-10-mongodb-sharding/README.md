# Task 10: MongoDB sharding demo
Run `node seed-shard-demo.js` against a MongoDB endpoint. It creates 24 deterministic records and a hashed shard-key index. The following commands require a real `mongos`, not a standalone mongod:

```javascript
sh.enableSharding("CollegeDB")
sh.shardCollection("CollegeDB.Students", { studentId: "hashed" })
sh.status()
```

A hashed studentId distributes evenly; a range key such as `{course:1,studentId:1}` supports course ranges but may hotspot popular courses. Config servers and shard replica sets must be configured before this is a real distributed deployment.

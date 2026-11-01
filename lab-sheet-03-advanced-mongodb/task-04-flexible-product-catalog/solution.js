// Lab Sheet 3: Task 4 - Flexible Product Catalog (Polymorphic Pattern)
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const col = client.db("CollegeDB").collection("Products");
    await col.deleteMany({});

    const products = [
      {
        product_id: "L101",
        category: "laptop",
        brand: "Dell",
        model: "XPS 15",
        price: 135000,
        specs: { ram_gb: 16, cpu: "Intel Core i7", ssd_storage_gb: 512, weight_kg: 1.8 }
      },
      {
        product_id: "L102",
        category: "laptop",
        brand: "Apple",
        model: "MacBook Pro 16",
        price: 210000,
        specs: { ram_gb: 32, cpu: "Apple M3 Pro", ssd_storage_gb: 1024, weight_kg: 2.1 }
      },
      {
        product_id: "M101",
        category: "mobile",
        brand: "Samsung",
        model: "Galaxy S24",
        price: 79999,
        specs: { battery_mah: 5000, screen_inches: 6.7, network: "5G", camera_mp: 50 }
      },
      {
        product_id: "M102",
        category: "mobile",
        brand: "Apple",
        model: "iPhone 15 Pro",
        price: 119999,
        specs: { battery_mah: 3274, screen_inches: 6.1, network: "5G", camera_mp: 48 }
      },
      {
        product_id: "C101",
        category: "camera",
        brand: "Sony",
        model: "Alpha A7 IV",
        price: 215000,
        specs: { sensor_type: "Full-Frame CMOS", megapixels: 33, video_res: "4K 60fps", lens_mount: "E-mount" }
      }
    ];

    await col.insertMany(products);
    console.log("=== Flexible Product Catalog (Polymorphic Design) ===");
    console.log("Inserted polymorphic product documents.\n");

    console.log("1. Search Laptops with RAM >= 16 GB:");
    const laptops = await col.find(
      { category: "laptop", "specs.ram_gb": { $gte: 16 } },
      { projection: { _id: 0, model: 1, "specs.ram_gb": 1, "specs.cpu": 1, price: 1 } }
    ).toArray();
    console.table(laptops);

    console.log("\n2. Search Mobiles with 5G and Battery >= 5000 mAh:");
    const mobiles = await col.find(
      { category: "mobile", "specs.network": "5G", "specs.battery_mah": { $gte: 5000 } },
      { projection: { _id: 0, model: 1, "specs.battery_mah": 1, price: 1 } }
    ).toArray();
    console.table(mobiles);

    console.log("\n3. Search Cameras supporting 4K video:");
    const cameras = await col.find(
      { category: "camera", "specs.video_res": { $regex: "4K" } },
      { projection: { _id: 0, model: 1, "specs.sensor_type": 1, "specs.video_res": 1, price: 1 } }
    ).toArray();
    console.table(cameras);

  } finally {
    await client.close();
  }
}
main().catch(console.error);

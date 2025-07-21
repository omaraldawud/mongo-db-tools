// commands/exportImport.js
import fs from "fs";
import path from "path";
import { connectDB } from "../db/connect-to-shipping-app.js";

export const exportCollection = async (collection) => {
  const db = await connectDB();

  try {
    const docs = await db.collection(collection).find().toArray();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folder = path.join(process.cwd(), "exportedData");
    const filename = `exported-${collection}-${timestamp}.json`;
    const filepath = path.join(folder, filename);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    fs.writeFileSync(filepath, JSON.stringify(docs, null, 2));
    console.log(
      `✅ Exported ${docs.length} documents from '${collection}' to '${filepath}'`
    );
  } catch (err) {
    console.error(`❌ Failed to export '${collection}':`, err.message);
  }
};

export const importCollection = async (collection, filename) => {
  console.log("⚠️ Import command is not implemented yet.");
};

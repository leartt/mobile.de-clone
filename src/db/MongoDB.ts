import { connect } from "mongoose";

async function run(): Promise<void> {
  // 4. Connect to MongoDB
  try {
    await connect("mongodb://localhost:27017/mobile-de-clone-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Error:" + error);
  }
}

export default run;

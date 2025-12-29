import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected successfully!");
  } catch (error) {
    console.log("Connection Error:", error);
    process.exit(1);
  }
};

export default connectionDB;

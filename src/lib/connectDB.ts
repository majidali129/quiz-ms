import mongoose, { Connection } from "mongoose";

interface ConnectionType {
  isConnected: Connection | null;
}

const connection: ConnectionType = {
  isConnected: null,
};
export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("DB is already connected ✅");
      return;
    }

    const uri = process.env.MONGODB_URI!;

    const connectionInstance = await mongoose.connect(uri);
    connection.isConnected = connectionInstance.connection;
    console.log("DB connected successfully 🚀🚀");
  } catch (error) {
    console.log("DB connection Error::", error);
    process.exit(1);
  }
};

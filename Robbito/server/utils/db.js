import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(
      `Successfully connected to Mongo Database ${conn.connection.host}`.bgGreen
        .white
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

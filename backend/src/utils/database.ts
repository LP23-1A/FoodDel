import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const MONGODB_URI =
      "mongodb+srv://idmanod:Umurzana87@cluster0.jzxoeqz.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection is successful");
  } catch (error: unknown) {
    throw new Error("Databse cannot conected");
  }
};

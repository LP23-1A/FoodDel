import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, // object id type
    ref: "User", // reference
  },

  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
  },
  label: String,
});

const FoodModel = mongoose.model("Food", FoodSchema);

export { FoodModel };

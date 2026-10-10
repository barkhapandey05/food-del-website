import "dotenv/config";
import mongoose from "mongoose";
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";

const description = "Food provides essential nutrients for overall health and well-being";
const foodItems = [
  ["Greek salad", 12, "Salad"],
  ["Veg salad", 18, "Salad"],
  ["Clover Salad", 16, "Salad"],
  ["Chicken Salad", 24, "Salad"],
  ["Lasagna Rolls", 14, "Rolls"],
  ["Peri Peri Rolls", 12, "Rolls"],
  ["Chicken Rolls", 20, "Rolls"],
  ["Veg Rolls", 15, "Rolls"],
  ["Ripple Ice Cream", 14, "Deserts"],
  ["Fruit Ice Cream", 22, "Deserts"],
  ["Jar Ice Cream", 10, "Deserts"],
  ["Vanilla Ice Cream", 12, "Deserts"],
  ["Chicken Sandwich", 12, "Sandwich"],
  ["Vegan Sandwich", 18, "Sandwich"],
  ["Grilled Sandwich", 16, "Sandwich"],
  ["Bread Sandwich", 24, "Sandwich"],
  ["Cup Cake", 14, "Cake"],
  ["Vegan Cake", 12, "Cake"],
  ["Butterscotch Cake", 20, "Cake"],
  ["Sliced Cake", 15, "Cake"],
  ["Garlic Mushroom ", 14, "Pure Veg"],
  ["Fried Cauliflower", 22, "Pure Veg"],
  ["Mix Veg Pulao", 10, "Pure Veg"],
  ["Rice Zucchini", 12, "Pure Veg"],
  ["Cheese Pasta", 12, "Pasta"],
  ["Tomato Pasta", 18, "Pasta"],
  ["Creamy Pasta", 16, "Pasta"],
  ["Chicken Pasta", 24, "Pasta"],
  ["Buttter Noodles", 14, "Noodles"],
  ["Veg Noodles", 12, "Noodles"],
  ["Somen Noodles", 20, "Noodles"],
  ["Cooked Noodles", 15, "Noodles"]
].map(([name, price, category], index) => ({
  name,
  image: `food_${index + 1}.png`,
  price,
  description,
  category
}));

const backendDirectory = dirname(fileURLToPath(import.meta.url));
const sourceImagesDirectory = resolve(backendDirectory, "../frontend/src/assets/frontend_assets");
const uploadDirectory = resolve(backendDirectory, "uploads");

async function seedFoods() {
  await connectDB();

  try {
    await mkdir(uploadDirectory, { recursive: true });

    for (const food of foodItems) {
      await copyFile(
        resolve(sourceImagesDirectory, food.image),
        resolve(uploadDirectory, food.image)
      );
    }

    const operations = foodItems.map((food) => ({
      updateOne: {
        filter: { name: food.name },
        update: { $set: food },
        upsert: true
      }
    }));

    await foodModel.bulkWrite(operations);
    console.log(`Seeded ${foodItems.length} food items.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedFoods().catch((error) => {
  console.error("Food seeding failed:", error);
  process.exitCode = 1;
});
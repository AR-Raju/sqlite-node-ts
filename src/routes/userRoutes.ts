import express, { Request, Response } from "express";
import { connectToDatabase } from "../database/db";

const router = express.Router();

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();

    // Fetch data from each table
    const categories = await db.all("SELECT * FROM category");
    const subCategories = await db.all("SELECT * FROM sub_category");
    const duas = await db.all("SELECT * FROM dua");

    // Combine all data into a single response
    const response = {
      categories,
      subCategories,
      duas,
    };

    console.log({ response });

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;

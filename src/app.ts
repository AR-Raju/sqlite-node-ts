import express from "express";
import { connectToDatabase } from "./database/db";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/dua", userRoutes);

// Initialize the database and start the server
(async () => {
  const db = await connectToDatabase();

  // Create a table if it doesn't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();

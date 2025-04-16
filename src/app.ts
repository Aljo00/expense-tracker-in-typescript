// src/app.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Basic route to test server
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Expense Tracker!");
});

// Use expense routes for endpoints starting with /api/expenses
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

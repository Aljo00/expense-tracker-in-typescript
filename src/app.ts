// src/app.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Use path.join to correctly specify the views directory
// This goes one level up from the current __dirname (which points to /dist after compilation)
// and then into the "views" folder in the project root.
app.set("views", path.join(__dirname, "..", "views"));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static("public"));

// Home route to render a landing page
app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Expense Tracker Home" });
});

// Route to render the add expense page
app.get("/add-expense", (req: Request, res: Response) => {
  res.render("add-expense", { title: "Add Expense" });
});

// Route to render the view expense page
app.get("/view-expense", (req: Request, res: Response) => {
  res.render("view-expense", { title: "View Expenses" });
});

// Route to render the summary page
app.get("/summary", (req: Request, res: Response) => {
  res.render("summary", { title: "Expense Summary" });
});

// Use expense routes for API endpoints (JSON-based for now)
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

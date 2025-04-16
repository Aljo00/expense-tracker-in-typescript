// src/routes/expenseRoutes.ts
import { Router } from "express";
import expenseController from "../controllers/expenseController";

const router = Router();

// Route to get all expenses
router.get("/", expenseController.getAllExpenses);

// Route to create a new expense
router.post("/", expenseController.createExpense);

export default router;

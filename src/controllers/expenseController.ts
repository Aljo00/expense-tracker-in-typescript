// src/controllers/expenseController.ts
import { Request, Response } from "express";
import pool from "../db/database";

// Controller to fetch all expenses
const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM expenses ORDER BY id DESC");
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new expense
const createExpense = async (req: Request, res: Response) => {
  const { amount, category, description, date, final_amount } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO expenses (amount, category, description, date, final_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [amount, category, description, date, final_amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllExpenses, createExpense };

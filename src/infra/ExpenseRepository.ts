import db from "../config/Database";
import Expense from "../models/Expense";

export default class ExpenseRepository {
  /**
   * Insert a new expense and assign its generated id back to the model.
   */
  async create(expense: Expense): Promise<Expense> {
    const result = await db.query(
      `INSERT INTO expenses (user_id, title, amount, date)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        expense.getUserId(),
        expense.getTitle(),
        expense.getAmount(),
        expense.getDate(),
      ]
    );
    expense.setId(result.rows[0].id);
    return expense;
  }

  /**
   * Get all expenses for a given user, most recent first.
   */
  async findByUserId(userId: number): Promise<Expense[]> {
    const result = await db.query(
      `SELECT id, user_id, title, amount, date
       FROM expenses
       WHERE user_id = $1
       ORDER BY date DESC`,
      [userId]
    );

    return result.rows.map(
      (row) =>
        new Expense(
          row.user_id,
          row.title,
          row.amount,
          new Date(row.date),
          row.id
        )
    );
  }

  /**
   * (Optional) Delete an expense by ID.
   */
  async deleteById(id: number): Promise<void> {
    await db.query(`DELETE FROM expenses WHERE id = $1`, [id]);
  }
}

export const expenseRepository = new ExpenseRepository();
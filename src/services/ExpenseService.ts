import ExpenseRepository from "../infra/ExpenseRepository";
import Expense from "../models/Expense";

export default class ExpenseService {
  private expenseRepo = new ExpenseRepository();

  /** Add a new expense for a user */
  public async addExpense(
    userId: number,
    title: string,
    amount: number,
    date: Date
  ): Promise<Expense> {
    const expense = new Expense(userId, title, amount, date);
    return await this.expenseRepo.create(expense);
  }

  /** Get all expenses for a user */
  public async listExpenses(userId: number): Promise<Expense[]> {
    return await this.expenseRepo.findByUserId(userId);
  }
}

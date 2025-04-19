import db from "../config/Database";
import User from "../models/User";

export default class UserRepository {
  /**
   * Create a new user in the DB and assign its generated id back to the model.
   */
  async create(user: User): Promise<User> {
    const result = await db.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [user.getName(), user.getEmail(), (user as any).password]
    );
    user.setId(result.rows[0].id);
    return user;
  }

  /**
   * Find a user by email. Returns null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query(
      `SELECT id, name, email, password
       FROM users
       WHERE email = $1`,
      [email]
    );
    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return new User(row.name, row.email, row.password, row.id);
  }

  /**
   * Find a user by ID. Returns null if not found.
   */
  async findById(id: number): Promise<User | null> {
    const result = await db.query(
      `SELECT id, name, email, password
       FROM users
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return new User(row.name, row.email, row.password, row.id);
  }
}

export const userRepository = new UserRepository();
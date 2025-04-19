import { Pool } from "pg"; // Import the Pool class from pg

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: "postgres",
      password: "aljo2005",
    });
  }

  // Method to connect to the database
  public connect() {
    return this.pool.connect();
  }

  // Custom query method
  public query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  // Optional: Add event listeners to monitor connection errors
  public handleError() {
    this.pool.on("error", (err) => {
      console.error("❌ Error in DB connection pool:", err);
    });
  }
}

// Export the Database class for use in other parts of the app
export default new Database(); // Singleton instance

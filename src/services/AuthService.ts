import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../infra/UserRepository";
import User from "../models/User";

export default class AuthService {
  private userRepo = new UserRepository();
  private jwtSecret = process.env.JWT_SECRET as string;
  private saltRounds = 10;

  /** Register a new user: hash password, save, return JWT token */
  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    // Check if user already exists
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error("Email already in use");
    }

    // Hash password
    const hashed = await bcrypt.hash(password, this.saltRounds);
    const user = new User(name, email, hashed);
    await this.userRepo.create(user);

    // Generate token
    const token = jwt.sign({ userId: user.getId() }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }

  /** Login: verify credentials, return JWT token */
  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, (user as any).password);
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.getId() }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }

  /** Verify a token and extract userId */
  public verifyToken(token: string): number {
    const payload = jwt.verify(token, this.jwtSecret) as { userId: number };
    return payload.userId;
  }
}

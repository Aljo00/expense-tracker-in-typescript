export default class Expense {
  private id: number | undefined;
  private userId: number;
  private title: string;
  private amount: number;
  private date: Date;

  constructor(
    userId: number,
    title: string,
    amount: number,
    date: Date,
    id?: number
  ) {
    this.userId = userId;
    this.title = title;
    this.amount = amount;
    this.date = date;
    this.id = id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDate(): Date {
    return this.date;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
  }
}

export default class User {
  protected id: number | undefined;
  protected name: string;
  protected email: string;
  protected password: string;

  constructor(name: string, email: string, password: string, id?: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }
}

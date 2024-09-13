export interface IAdmin {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: "admin" | "customer";
  createdAt?: Date;
  updatedAt?: Date;
}

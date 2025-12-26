import mongoose, { Schema, models, model, Document } from "mongoose";

// 1. Define the Interface (The "Type" part)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string; // Optional because sometimes you might select users without password
  createdAt: Date;
  updatedAt: Date;
}

// 2. Pass the Interface to the Schema (Generics)
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 3. Export with the Type
const User = models.User || model<IUser>("User", UserSchema);

export default User;

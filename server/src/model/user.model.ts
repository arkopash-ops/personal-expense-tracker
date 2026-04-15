import mongoose, { Schema, Document } from "mongoose";
import type { Iuser } from "../types/user.types.js";

export interface UserDocument extends Iuser, Document { }

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
}, { timestamps: true });

const User = mongoose.model<UserDocument>("user", userSchema);
export default User;
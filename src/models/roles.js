import mongoose from "mongoose";

export const ROLES = ["user", "admin", "moderador"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Role', roleSchema);
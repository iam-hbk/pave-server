// models/Material.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IMaterial extends Document {
  /**
   * This model represents the material uploaded by lecturers for specific classes.
   * Each material has a name, a link to the material, and the lecturer who uploaded it.
   */
  module: mongoose.Schema.Types.ObjectId; // Reference to Module model
  materialName: string;
  materialLink: string;
  uploadedBy: mongoose.Schema.Types.ObjectId; // Reference to User model (lecturer)
}

const MaterialSchema = new Schema<IMaterial>({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  materialName: { type: String, required: true },
  materialLink: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<IMaterial>("Material", MaterialSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IModule extends Document {
  moduleName: string;
  moduleCode: string; // Added module code for unique identification
  lecturer: mongoose.Schema.Types.ObjectId; // Reference to User model
  moduleMaterial: string; // link to the folder containing the module material
}

const ModuleSchema = new Schema<IModule>({
  moduleName: { type: String, required: true },
  moduleCode: { type: String, required: true, unique: true }, // Ensure module codes are unique
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleMaterial: { type: String, required: true },
});

export default mongoose.model<IModule>("Module", ModuleSchema);

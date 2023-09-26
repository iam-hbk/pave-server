import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  /**
   * This will contain the dynamic details related to each session of the class.
   */

  module: mongoose.Schema.Types.ObjectId; // Reference to module model
  qrCodeOrigin: {
    lat: number;
    long: number;
  };
  classStartTime: Date;
  classEndTime: Date;
  isActive: boolean; // To check if the session is currently active or not
}

const SessionSchema = new Schema<ISession>({
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  qrCodeOrigin: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  classStartTime: { type: Date, required: true },
  classEndTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<ISession>("Session", SessionSchema);

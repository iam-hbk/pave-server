import mongoose, { Document, Schema } from "mongoose";

export interface IPaveCoinsTransaction extends Document {
  /**
   * This model will allow you to keep a record of all Pave Coin transactions for each user,
   * making it easy to track and manage the reward system.
   */

  user: mongoose.Schema.Types.ObjectId; // Reference to User model
  amount: number;
  reason: string;
  date: Date;
}

const PaveCoinsTransactionSchema = new Schema<IPaveCoinsTransaction>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IPaveCoinsTransaction>(
  "PaveCoinsTransaction",
  PaveCoinsTransactionSchema
);

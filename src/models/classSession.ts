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
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  qrCodeOrigin: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  classStartTime: { type: Date, required: true },
  classEndTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//new session pipeline
export const newSessionPipeline = [
  {
    $match: {
      $or: [
        // Match documents that are newly inserted and have an 'updatedAt' field
        {
          operationType: "insert",
          "fullDocument.updatedAt": { $exists: true },
        },
        // Match documents that are updated and have the 'isActive' field updated
        {
          operationType: "update",
          "updateDescription.updatedFields.isActive": { $exists: true },
        },
      ],
    },
  },
  {
    $addFields: {
      // If operationType is 'insert', set isNew to true, otherwise set it to false
      isNew: { $eq: ["$operationType", "insert"] },
      // If operationType is 'update', set wasUpdated to true, otherwise set it to false
      wasUpdated: { $eq: ["$operationType", "update"] },
      // If operationType is 'insert', get the id from fullDocument._id, otherwise get it from documentKey._id
      id: {
        $cond: [
          { $eq: ["$operationType", "insert"] },
          "$fullDocument._id",
          "$documentKey._id",
        ],
      },
    },
  },
];

export default mongoose.model<ISession>("Session", SessionSchema);

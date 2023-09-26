import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'Student' | 'Lecturer' | 'Admin';
    name: string;
    profilePicture: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Lecturer', 'Admin'], required: true },
    name: { type: String, required: true },
    profilePicture: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);

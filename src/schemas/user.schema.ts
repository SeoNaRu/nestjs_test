import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  password: string;
  name: string;
  joinDate: Date;
  car: {
    model: string;
    manufactureYear: number;
    plateNumber: string;
    photoUrl: string;
    isVerified: boolean;
    verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  };
  posts: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
}

export const UserSchema = new Schema<IUser>({
  password: { type: String, required: true },
  name: { type: String, required: true },
  joinDate: { type: Date, default: Date.now, required: true },
  car: {
    model: { type: String, required: true },
    manufactureYear: { type: Number, required: true },
    plateNumber: { type: String, required: true },
    photoUrl: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    verificationStatus: {
      type: String,
      enum: ['Pending', 'Verified', 'Rejected'],
      required: true,
    },
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default model<IUser>('User', UserSchema);

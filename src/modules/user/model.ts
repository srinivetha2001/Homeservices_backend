import mongoose, { Schema, Document, Model } from "mongoose";
import { Role } from "../../types/domain";

export interface UserDocument extends Document {
	email: string;
	name: string;
	passwordHash: string;
	roles: Role[];
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			index: true
		},
		name: {
			type: String,
			required: true
		},
		passwordHash: {
			type: String,
			required: true
		},
		roles: [
			{
				type: String,
				enum: Object.values(Role),
				default: Role.USER
			}
		]
	},
	{ timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export const User: Model<UserDocument> =
	mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);



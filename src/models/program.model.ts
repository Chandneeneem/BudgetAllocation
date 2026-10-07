import mongoose, { Document, Schema } from 'mongoose';

export interface IProgram extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const programSchema = new Schema<IProgram>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Program = mongoose.model<IProgram>('Program', programSchema);

export default Program;
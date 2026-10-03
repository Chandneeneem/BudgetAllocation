import mongoose, { Document, Schema } from 'mongoose';

export interface IYear extends Document {
    year: number;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
    updatedAt: Date;
}

const yearSchema = new Schema<IYear>(
    {
        year: {
            type: Number,
            required: true,
            unique: true,
            min: 2000,
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
        },
    },
    {
        timestamps: true,
    }
);

const Year = mongoose.model<IYear>('Year', yearSchema);

export default Year;
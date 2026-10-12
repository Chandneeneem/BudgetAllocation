import mongoose, { Document, Schema } from 'mongoose';

export interface ILocationDepartment extends Document {
    locationName: string;
    programCenterId: mongoose.Types.ObjectId;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const locationDepartmentSchema = new Schema<ILocationDepartment>(
    {
        locationName: {
            type: String,
            required: true,
            trim: true,
        },
        programCenterId: {
            type: Schema.Types.ObjectId,
            ref: 'ProgramCenter',
            required: true,
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

const LocationDepartment = mongoose.model<ILocationDepartment>(
    'LocationDepartment',
    locationDepartmentSchema
);

export default LocationDepartment;
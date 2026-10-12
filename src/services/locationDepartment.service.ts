import LocationDepartment from '../models/locationDepartment.model';

interface CreateLocationDepartmentData {
    locationName: string;
    programCenterId: string;
    description: string;
}

interface UpdateLocationDepartmentData {
    id: string;
    locationName?: string;
    programCenterId?: string;
    description?: string;
}

interface GetLocationDepartmentsParams {
    page: number;
    limit: number;
    search?: string;
}

// Create Location Department
export const createLocationDepartment = async (
    data: CreateLocationDepartmentData
) => {
    return LocationDepartment.create(data);
};

// Get all Location Departments with pagination and search
export const getLocationDepartments = async ({
    page,
    limit,
    search,
}: GetLocationDepartmentsParams) => {
    const skip = (page - 1) * limit;

    const filter: {
        locationName?: { $regex: string; $options: string };
    } = {};

    if (search) {
        filter.locationName = {
            $regex: search,
            $options: 'i',
        };
    }

    const [departments, total] = await Promise.all([
        LocationDepartment.find(filter)
            .populate('programCenterId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        LocationDepartment.countDocuments(filter),
    ]);

    return {
        data: departments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

// Get Location Department by ID
export const getLocationDepartmentById = async (id: string) => {
    const department = await LocationDepartment.findById(id)
        .populate('programCenterId');

    if (!department) {
        throw new Error('Location department not found');
    }

    return department;
};

// Update Location Department
export const updateLocationDepartment = async (
    data: UpdateLocationDepartmentData
) => {
    const { id, locationName, programCenterId, description } = data;

    const department = await LocationDepartment.findById(id);

    if (!department) {
        throw new Error('Location department not found');
    }

    department.locationName = locationName ?? department.locationName;
    department.programCenterId =
        programCenterId
            ? new (await import('mongoose')).default.Types.ObjectId(programCenterId)
            : department.programCenterId;
    department.description = description ?? department.description;

    await department.save();

    return LocationDepartment.findById(department._id)
        .populate('programCenterId');
};

// Delete Location Department
export const deleteLocationDepartment = async (id: string) => {
    const department = await LocationDepartment.findById(id);

    if (!department) {
        throw new Error('Location department not found');
    }

    await department.deleteOne();

    return department;
};
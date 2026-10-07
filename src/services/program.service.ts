import Program from '../models/program.model';

interface CreateProgramData {
    name: string;
    description: string;
}

interface UpdateProgramData {
    id: string;
    name?: string;
    description?: string;
}

interface GetProgramsParams {
    page: number;
    limit: number;
    search?: string;
}

// Create Program
export const createProgram = async (
    data: CreateProgramData
) => {
    const existingProgram = await Program.findOne({
        name: data.name,
    });

    if (existingProgram) {
        throw new Error('Program already exists');
    }

    return Program.create(data);
};

// Get Programs with pagination and search
export const getPrograms = async ({
    page,
    limit,
    search,
}: GetProgramsParams) => {
    const skip = (page - 1) * limit;

    const filter: {
        name?: {
            $regex: string;
            $options: string;
        };
    } = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: 'i',
        };
    }

    const [programs, total] = await Promise.all([
        Program.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Program.countDocuments(filter),
    ]);

    return {
        data: programs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

// Get Program by ID
export const getProgramById = async (
    id: string
) => {
    const program = await Program.findById(id);

    if (!program) {
        throw new Error('Program not found');
    }

    return program;
};

// Update Program
export const updateProgram = async (
    data: UpdateProgramData
) => {
    const { id, name, description } = data;

    const program = await Program.findById(id);

    if (!program) {
        throw new Error('Program not found');
    }

    // Check duplicate name
    if (name && name !== program.name) {
        const existingProgram = await Program.findOne({
            name,
            _id: { $ne: id },
        });

        if (existingProgram) {
            throw new Error('Program already exists');
        }
    }

    program.name = name ?? program.name;
    program.description = description ?? program.description;

    return program.save();
};

// Delete Program
export const deleteProgram = async (
    id: string
) => {
    const program = await Program.findById(id);

    if (!program) {
        throw new Error('Program not found');
    }

    await program.deleteOne();

    return program;
};
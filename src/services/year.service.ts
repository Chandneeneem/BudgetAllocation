import Year from '../models/year.model';
import { CreateYearData, UpdateYearData } from '../types/year.type';

export const createYear = async (
    data: CreateYearData
) => {
    const existingYear = await Year.findOne({
        year: data.year,
    });

    if (existingYear) {
        throw new Error('Year already exists');
    }

    return Year.create(data);
};

export const getYears = async (
    page: number,
    limit: number,
    search: string = ''
) => {
    const skip = (page - 1) * limit;

    const query = search
        ? { year: { $regex: search, $options: 'i' } }
        : {};

    const [years, total] = await Promise.all([
        Year.find(query as any)
            .skip(skip)
            .limit(limit)
            .sort({ year: -1 }),

        Year.countDocuments(query as any),
    ]);

    return {
        data: years,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

export const getYearById = async (id: string) => {
    const year = await Year.findById(id);

    if (!year) {
        throw new Error('Year not found');
    }

    return year;
};

export const updateYear = async (
    id: string,
    data: UpdateYearData
) => {
    const existingYear = await Year.findById(id);

    if (!existingYear) {
        throw new Error('Year not found');
    }

    const duplicateYear = await Year.findOne({
        year: data.year,
        _id: { $ne: id },
    });

    if (duplicateYear) {
        throw new Error('Year already exists');
    }

    existingYear.year = data.year ?? existingYear.year;
    existingYear.status = data.status ?? existingYear.status;

    return existingYear.save();
};

export const deleteYear = async (id: string) => {
    const year = await Year.findById(id);

    if (!year) {
        throw new Error('Year not found');
    }

    await year.deleteOne();
};
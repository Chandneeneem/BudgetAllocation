import Year from '../models/year.model';



interface UpdateYearData {
    year?: number;
    status?: 'ACTIVE' | 'INACTIVE';
}
interface CreateYearData {
    year: number;
}

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

export const getYears = async () => {
    return await Year.find().sort({ year: -1 });
};

export const getYearById = async (id: string) => {
    const year = await Year.findById(id);

    if (!year) {
        throw new Error('Year not found');
    }

    return year;
};

// export const updateYear = async (
//     id: string,
//     data: UpdateYearData
// ) => {
//     const existingYear = await Year.findById(id);

//     if (!existingYear) {
//         throw new Error('Year not found');
//     }

//     if (data.year && data.year !== existingYear.year) {
//         const duplicateYear = await Year.findOne({
//             year: data.year,
//             _id: { $ne: id },
//         });

//         if (duplicateYear) {
//             throw new Error('Year already exists');
//         }
//     }

//     existingYear.year = data.year ?? existingYear.year;
//     existingYear.status = data.status ?? existingYear.status;

//     return existingYear.save();
// };

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
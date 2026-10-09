export interface CreateProgramData {
    name: string;
    description: string;
}

export interface UpdateProgramData {
    id: string;
    name?: string;
    description?: string;
}

export interface GetProgramsParams {
    page: number;
    limit: number;
    search?: string;
}
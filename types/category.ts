export interface CategoryResponse {
    status: number;
    data: CategoryDb[];
}

export interface CategoryDb {
    _id: string;
    nombre: string;
    userId: string,
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

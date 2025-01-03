export interface ComprasResponse {
    status: number;
    data: Compras[];
}

export interface Compras {
    _id?: string;
    productos: Producto[];
    estado: string;
    total: number;
    userId: string;
    fecha: Date | null,
}

export interface Producto {
    _id: string;
    nombre: string;
    stock: number;
    stock_min: number;
    idCategory: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

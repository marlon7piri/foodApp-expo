export interface Tareas {
  _id?: string;
  de?: De | null;
  para: Para | null;
  asunto: string;
  descripcion: string;
  estado: string;
  fecha_final: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface De {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface Para {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

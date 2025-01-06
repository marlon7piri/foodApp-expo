export interface ContactoResponse {
  message: string;
  data: Contacto[];
}
export interface Contacto {
  _id?: string;
  nombre: string;
  email: string;
  userId: string;
}

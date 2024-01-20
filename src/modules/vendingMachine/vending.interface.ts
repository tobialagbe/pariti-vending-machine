export interface IGenericResponse<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
  meta?: IGenericResponseMeta;
}

export interface IGenericResponseMeta {
  page: number;
  limit: number;
  total_result: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Coin {
  denomination: number;
  quantity: number;
}

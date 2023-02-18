import { Dict } from "./datastructures";

export interface ApiError{
    message: string,
    errors?: Dict,
    status: number,
}
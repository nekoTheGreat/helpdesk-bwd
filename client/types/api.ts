import { Dict } from "./datastructures";

export interface ApiError{
    message: string,
    errors?: Dict,
    status: number,
}
export interface Attachment{
    id: number,
    type: string,
    identifier: number,
    disk_type: string,
    file_path: string,
    is_active: number,
    file_name: string,
    unique_file_name: string,
    url: string,
}
export interface Ticket{
    id: number,
    subject: string,
    description: string,
    street_address: string,
    purok: string,
    barangay: string,
    municipality: string,
    user: number,
    photos: Attachment[],
}
export interface Attachment{
    id: number,
    type: string,
    identifier: number,
    file_path: string,
    file_name: string,
    unique_file_name: string,
    url: string
}
export interface AttachmentForm extends Attachment{
    is_deleted?: boolean,
}
export interface TicketForm extends Omit<Ticket, 'photos'>{
    photos?: AttachmentForm[],
    images?: any[],
    deleted_photos?: number[],
}
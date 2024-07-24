export interface User {
    id: number;
    username: string;
    email?: string;  // Optional fields if not using
    password?: string;
}
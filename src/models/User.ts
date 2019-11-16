import db from '../db';

export interface User {
    pk: number;
    id: string;
    username: string;
    email: string;
}


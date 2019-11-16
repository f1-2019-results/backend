import db from '../db';
import uuid from 'uuid';

export interface User {
    id: number;
    uid: string;
    createdAt: Date;
    username: string;
    email: string;
    passwordHash: string;
    hashType: string;
}
type UserProjection = {
    [key in keyof User]?: 0 | 1;
}

export async function create(user: Omit<User, 'id' | 'uid' | 'createdAt'>) {
    const newUser: Omit<User, 'id'> = {
        uid: uuid.v4(),
        createdAt: new Date(),
        ...user,
    };

    const res = await db('user').insert(newUser);
    return newUser;
}

export async function findOne(filter: Partial<User>, projection: UserProjection = {}) {
    const keys = Object.keys(projection).filter(key => projection[key] === 1);
    db
        .select(keys)
        .where(filter)
        .from('user');
}

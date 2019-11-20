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

export async function create(user: Omit<User, 'id' | 'uid' | 'createdAt'>): Promise<User> {
    const newUser: Omit<User, 'id'> = {
        uid: uuid.v4(),
        createdAt: new Date(),
        ...user,
    };

    const ids = await db('user').insert(newUser, 'id');
    return { ...newUser, id: ids[0] };
}

export async function findOne(filter: Partial<User>, projection: UserProjection = {}): Promise<User | undefined> {
    const keys = Object.keys(projection).filter(key => projection[key] === 1);
    return db
        .select(keys)
        .where(filter)
        .from('user')
        .first();
}

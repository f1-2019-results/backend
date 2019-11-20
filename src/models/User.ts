import db from '../db';
import uuid from 'uuid';
import Projection from './Projection';

export interface UserData {
    id: number;
    uid: string;
    createdAt: Date;
    username: string;
    email: string;
    passwordHash: string;
    hashType: string;
}

export async function create(user: Omit<UserData, 'id' | 'uid' | 'createdAt'>): Promise<UserData> {
    const newUser: Omit<UserData, 'id'> = {
        uid: uuid.v4(),
        createdAt: new Date(),
        ...user,
    };

    const ids = await db('user').insert(newUser, 'id');
    return { ...newUser, id: ids[0] };
}

export async function findOne(filter: Partial<UserData>, projection: Projection<UserData> = {}): Promise<UserData | undefined> {
    const keys = Object.keys(projection);
    return db('user')
        .select(keys)
        .where(filter)
        .first();
}

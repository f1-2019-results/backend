import db from '../db';
import Projection from './Projection';
import crypto from 'crypto';
import config from '../config';

export interface Session {
    id: string;
    userId: number;
    createdAt: Date;
    expiresAt: Date;
}

export async function create(sessionData: Omit<Session, 'id'>) {
    const sessionToken = await crypto.randomBytes(config.sessionTokenBytes).toString('base64');

    const session: Session = {
        ...sessionData,
        id: sha256(sessionToken),
    };

    await db('session').insert(session);
    return {
        ...session,
        id: sessionToken,
    };
}

export async function findOne(id: string, projection: Projection<Session> = {}): Promise<Session | undefined> {
    const keys = Object.keys(projection).filter(key => projection[key] === 1);
    const session: Session = await db('session')
        .select(keys)
        .where({ id: sha256(id) })
        .first();
    if (!session)
        return undefined;
    return {
        ...session,
        id: id,
    }
}

export async function removeOne(id: string): Promise<boolean> {
    const deleteCount = await db('session')
        .where({ id: sha256(id) })
        .delete();
    return deleteCount === 1;
}

function sha256(s: string) {
    return crypto.createHash('sha256').update(s).digest('base64');
}

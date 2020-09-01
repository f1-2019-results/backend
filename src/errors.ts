
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

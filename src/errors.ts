
export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
    }
}

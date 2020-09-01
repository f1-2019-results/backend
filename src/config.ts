export default {
    user: {
        minUsernameLength: 3,
        minPasswordLength: 8,
    },
    bcryptWorkFactor: 12,
    sessionTokenBytes: 16,
    defaultSessionLength: 1000 * 60 * 60 * 24,
};

const users = require('../models/users');

module.exports = {
    async parseAuthorizationToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        if (!token) {
            return next();
        }
        const payload = await users.verifyJWT(token);
        req.user = payload;
        next();
    },
    requireUser(requireAdmin = false) {
        return (req, res, next) => {
            if(!req.user) {
                return next({
                    status: 401,
                    message: 'You must be logged in to complete this action.'
                });
            }
            next();
        };
    }
};
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';

function hasRole(roleRequired, rolesGranted) {
    return rolesGranted.some(role => role === roleRequired);
}

export function authorizeRole(roleName) {
    return (req, res, next) => {
        const { user } = req;

        if (!user) {
            return res.status(UNAUTHORIZED).json({
                message: 'UnAuthorized'
            });
        }

        if (!hasRole(roleName, user.roles)) {
            return res.status(FORBIDDEN).json({
                message: 'You don t have permission to do this'
            });
        }

        return next();
    };
}

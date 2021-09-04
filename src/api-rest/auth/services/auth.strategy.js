import { UNAUTHORIZED } from 'http-status';
import { decode } from 'jsonwebtoken';

const BEARER_PREFIX = 'Bearer ';

export function jwtAuthenticateMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    let token;

    if (!bearerHeader) {
        return res.status(UNAUTHORIZED).json({
            message: 'UnAuthorized'
        });
    }

    if (bearerHeader.startsWith(BEARER_PREFIX)) {
        token = bearerHeader.slice(BEARER_PREFIX.length);
    } else { token = bearerHeader; }

    const userPayload = decode(token);

    req.user = userPayload;

    return next();
}

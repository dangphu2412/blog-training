import { ERROR_CODE } from 'common/enum';
import { BAD_REQUEST } from 'http-status';
import joi from 'joi';

export function registerValidator(req, res, next) {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        fullName: joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(BAD_REQUEST).json({
            code: ERROR_CODE.BAD_REQUEST,
            message: result.error,
        });
    }

    return next();
}

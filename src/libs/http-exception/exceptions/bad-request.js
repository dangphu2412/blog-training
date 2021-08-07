import { BAD_REQUEST } from 'http-status';
import { ERROR_CODE } from '../../../common/enum';
import { HttpException } from './base';

export class BadRequestException extends HttpException {
    constructor(msg = 'Bad request') {
        super(BAD_REQUEST, ERROR_CODE.BAD_REQUEST, msg);
    }
}

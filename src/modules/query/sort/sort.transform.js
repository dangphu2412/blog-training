import { BadRequestException } from 'libs/http-exception/exceptions';
import { DirectionEnum } from '../enum/direction.enum';

export class SortTransform {
    static SEPARATOR = ',';

    /**
     * @type {string | Array | null}
     */
    sortQuery;

    constructor(sortQuery) {
        this.sortQuery = sortQuery;
    }

    transform() {
        if (!this.sortQuery) {
            return null;
        }

        if (Array.isArray(this.sortQuery)) {
            throw new BadRequestException('Do not pass more than 1 sort in request params');
        }

        const fields = this.sortQuery.split(SortTransform.SEPARATOR);

        return fields.map(field => {
            if (field[0] === '-') {
                return {
                    column: field.slice(1),
                    direction: DirectionEnum['-']
                };
            }

            return {
                column: field,
                direction: DirectionEnum['+']
            };
        });
    }
}

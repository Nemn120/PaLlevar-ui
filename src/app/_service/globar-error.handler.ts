import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


    constructor(private injector: Injector) { }

    handleError(error: Error) {
        const logger = this.injector.get(NGXLogger);

        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };
        logger.error(err);
    }
}

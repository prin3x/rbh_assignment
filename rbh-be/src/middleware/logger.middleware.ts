import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  use(req, res, next) {
    this.logger.log(
      `Request Info PATH => ${req.originalUrl}, METHOD => ${
        req.method
      }, BODY => ${JSON.stringify(req.body)}`,
    );

    next();
  }
}

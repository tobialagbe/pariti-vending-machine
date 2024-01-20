import * as dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import { v4 as uuid } from 'uuid';
import middleWare from './modules/shared/middlewares';
import routes from './modules/shared/routes';
import logger from '../logger';
const app = fastify({
  logger: {
    level: 'info',
  },
  disableRequestLogging: true,
  genReqId(req) {
    return uuid();
  },
});
logger(app);

// register middleware
middleWare(app);

// register route
routes(app);

app.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
export default app;

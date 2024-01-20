import { rateLimit } from '../../../configs/app';

const middleWare = (fastify) => {
  fastify.register(require('fastify-helmet'), { contentSecurityPolicy: false });
  fastify.register(require('fastify-rate-limit'), {
    ...rateLimit,
  });
};

export default middleWare;

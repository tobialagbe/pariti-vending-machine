import app from '../vendingMachine/vending.route';

export default function (fastify) {
  fastify.register(app, { prefix: '/v1' });
}

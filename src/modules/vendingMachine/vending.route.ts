import vendingMachineController from './vending.controller';

export default function (fastify, opt, next) {
  fastify.get('/health', vendingMachineController.healthCheck);

  // User operations
  fastify.post('/vending-machine/buy', vendingMachineController.buyProduct);
  
  // Maintenance operations
  fastify.post('/vending-machine/maintenance/set-price', vendingMachineController.setProductPrice);
  fastify.post('/vending-machine/maintenance/restock', vendingMachineController.restockProduct);
  fastify.post('/vending-machine/maintenance/update-coins', vendingMachineController.updateCoins);

  next();
}

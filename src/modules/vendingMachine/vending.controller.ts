import { initialProducts, initialCoins, acceptedDenominations, maintenanceKey } from './vending.constants';
import VendingMachineService from './vending.service';

const vendingMachineService = new VendingMachineService({initialProducts, initialCoins, acceptedDenominations, maintenanceKey});

const buyProduct = async (request, response) => {
  try {
      const { productId, quantityToBuy, coins } = request.body;
      const result = await vendingMachineService.buyProduct(productId, quantityToBuy, coins);
      return response.send({ success: true, message: 'Product purchased successfully', data: result });
  } catch (error) {
      return response.status(400).send({ success: false, message: error.message });
  }
};

const setProductPrice = async (request, response) => {
  try {
      const { productId, newPrice } = request.body;
      await vendingMachineService.setProductPrice(productId, newPrice, request.user.key); // Assuming key comes from authenticated user
      return response.send({ success: true, message: 'Product price updated successfully' });
  } catch (error) {
      return response.status(400).send({ success: false, message: error.message });
  }
};

const restockProduct = async (request, response) => {
  try {
      const { productId, quantity } = request.body;
      await vendingMachineService.restockProduct(productId, quantity, request.user.key);
      return response.send({ success: true, message: 'Product restocked successfully' });
  } catch (error) {
      return response.status(400).send({ success: false, message: error.message });
  }
};

const updateCoins = async (request, response) => {
  try {
      const { denomination, quantity } = request.body;
      await vendingMachineService.updateCoins(denomination, quantity, request.user.key);
      return response.send({ success: true, message: 'Coins updated successfully' });
  } catch (error) {
      return response.status(400).send({ success: false, message: error.message });
  }
};

export default { buyProduct, setProductPrice, restockProduct, updateCoins };


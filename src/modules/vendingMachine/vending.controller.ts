import { Coin, Product } from './vending.interface';
import VendingMachineService from './vending.service';

const initialProducts: Product[] = [
  { id: 1, name: "Water", price: 150, quantity: 10 }, // Price in cents
  { id: 2, name: "Chocolate", price: 100, quantity: 20 },
  { id: 3, name: "Chips", price: 75, quantity: 15 },
  { id: 4, name: "Cookies", price: 95, quantity: 10 }
];
      
const initialCoins: Coin[] = [
  { denomination: 25, quantity: 50 }, // 25 cents coins
  { denomination: 10, quantity: 100 }, // 10 cents coins
  { denomination: 5, quantity: 200 },  // 5 cents coins
  { denomination: 1, quantity: 500 }   // 1 cent coins
];

 const acceptedDenominations = [1, 5, 10, 25];
      
const maintenanceKey = "secureMaintenanceKey123";

const vendingMachineService = new VendingMachineService({initialProducts, initialCoins, acceptedDenominations, maintenanceKey});
const healthCheck = async (request, response) => {

  console.log('HEALTH CHECK PING!');
  return "Server is up and running!";
}

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

export default { healthCheck, buyProduct, setProductPrice, restockProduct, updateCoins };


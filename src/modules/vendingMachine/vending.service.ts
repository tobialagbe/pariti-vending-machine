import VendingMachine from './VendingMachine'; // Import the VendingMachine class
import { Coin, Product } from './vending.interface';

interface VendingMachineServiceProps {
  initialProducts: Product[], 
  initialCoins: Coin[], 
  acceptedDenominations: number[],
  maintenanceKey: string
}

export default class VendingMachineService {
    private vendingMachine: VendingMachine;

    constructor({ initialProducts, initialCoins, acceptedDenominations, maintenanceKey}: VendingMachineServiceProps
    ) {
      this.vendingMachine = new VendingMachine(initialProducts, initialCoins, acceptedDenominations, maintenanceKey);
    }

    async buyProduct(productId: number, quantityToBuy: number = 1, coins: Coin[]) {
        // Logic to handle product purchase
        return this.vendingMachine.buyProduct(productId, quantityToBuy, coins);
    }

    async setProductPrice(productId: number, newPrice: number, key: string) {
        // Logic to set product price
        this.vendingMachine.setProductPrice(productId, newPrice, key);
    }

    async restockProduct(productId: number, quantity: number, key: string) {
        // Logic to restock a product
        this.vendingMachine.restockProduct(productId, quantity, key);
    }

    async updateCoins(denomination: number, quantity: number, key: string) {
        // Logic to update coins
        this.vendingMachine.updateCoins(denomination, quantity, key);
    }
}



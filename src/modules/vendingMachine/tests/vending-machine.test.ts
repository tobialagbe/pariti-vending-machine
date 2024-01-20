import VendingMachine from '../VendingMachine';
import { Coin, Product } from '../vending.interface';
import { initialProducts, initialCoins, acceptedDenominations, maintenanceKey } from '../vending.constants';

describe('VendingMachine', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine(initialProducts, initialCoins, acceptedDenominations, maintenanceKey);
  });

  it('should allow buying a product with exact change', () => {
    const coinsToInsert: Coin[] = [{ denomination: 25, quantity: 7 }]; 
    const { change, product } = vendingMachine.buyProduct(1, 1, coinsToInsert);
    expect(product.id).toBe(1);
    expect(change).toEqual(expect.arrayContaining([{ denomination: 25, quantity: 1 }]));
  });

  it('should throw an error for insufficient amount paid', () => {
    const coinsToInsert: Coin[] = [{ denomination: 25, quantity: 5 }];
    expect(() => {
      vendingMachine.buyProduct(1, 1, coinsToInsert);
    }).toThrow("Insufficient amount paid");
  });

  it('should set the product price when authorized', () => {
    vendingMachine.setProductPrice(2, 120, maintenanceKey); 
    expect(vendingMachine['products'].get(2)?.price).toBe(120);
  });

  it('should throw an error when unauthorized user tries to set product price', () => {
    expect(() => {
      vendingMachine.setProductPrice(2, 120, 'wrongKey');
    }).toThrow("Unauthorized access");
  });

  it('should restock a product when authorized', () => {
    vendingMachine.restockProduct(3, 10, maintenanceKey); 
    expect(vendingMachine['products'].get(3)?.quantity).toBe(25); 
  });

  it('should throw an error when unauthorized user tries to restock product', () => {
    expect(() => {
      vendingMachine.restockProduct(3, 10, 'wrongKey');
    }).toThrow("Unauthorized access");
  });

  it('should update coins when authorized', () => {
    vendingMachine.updateCoins(1, 10, maintenanceKey); 
    expect(vendingMachine['coins'].get(1)?.quantity).toBe(510); 
  });
});

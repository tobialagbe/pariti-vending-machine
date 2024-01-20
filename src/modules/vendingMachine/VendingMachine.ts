import { Coin, Product } from "./vending.interface";

export default class VendingMachine {
    private products: Map<number, Product>;
    private coins: Map<number, Coin>;
    private acceptedDenominations: Set<number>;
    private maintenanceKey: string;

    constructor(products: Product[], coins: Coin[], acceptedDenominations: number[], maintenanceKey: string) {
        this.products = new Map(products.map(p => [p.id, p]));
        this.coins = new Map(coins.map(c => [c.denomination, c]));
        this.acceptedDenominations = new Set(acceptedDenominations);
        this.maintenanceKey = maintenanceKey;
    }

    private isAuthorized(key: string): boolean {
        return this.maintenanceKey === key;
    }

    private calculateChange(amount: number): Coin[] {
        let remaining = amount;
        const change: Coin[] = [];

        for (let [denomination, coin] of Array.from(this.coins.entries()).sort((a, b) => b[0] - a[0])) {
            if (remaining >= denomination) {
                const numCoins = Math.min(Math.floor(remaining / denomination), coin.quantity);
                remaining -= numCoins * denomination;

                if (numCoins > 0) {
                    change.push({ denomination, quantity: numCoins });
                }
            }
        }

        if (remaining > 0) throw new Error("Unable to provide exact change");

        // Deduct change from the machine's coin inventory
        change.forEach(c => {
            this.coins.get(c.denomination)!.quantity -= c.quantity;
        });

        return change;
    }

    private isChangeAvailable(amount: number): boolean {
        try {
            this.calculateChange(amount);
            return true;
        } catch {
            return false;
        }
    }

    public buyProduct(productId: number, quantityToBuy: number, coins: Coin[]): { change: Coin[], product: Product } {
        const product = this.products.get(productId);

        if (!product) throw new Error("Product not found");
        if (product.quantity < quantityToBuy) throw new Error("Insufficient stock");

        // Calculate total cost and total paid amount
        const totalCost = product.price * quantityToBuy;
        const totalPaid = coins.reduce((sum, coin) => sum + coin.denomination * coin.quantity, 0);

        // Check if all the coins are of accepted denominations
        coins.forEach(coin => {
            if (!this.acceptedDenominations.has(coin.denomination)) {
                throw new Error(`Coin denomination ${coin.denomination} is not accepted`);
            }
        });

        if (totalPaid < totalCost) throw new Error("Insufficient amount paid");

        const changeAmount = totalPaid - totalCost;
        if (!this.isChangeAvailable(changeAmount)) throw new Error("Unable to provide exact change");

        product.quantity -= quantityToBuy;

        // Add provided coins to coin inventory
        coins.forEach(coin => this.addToCoinInventory(coin.denomination, coin.quantity));

        // Calculate and give change
        const change = this.calculateChange(changeAmount);

        return { change, product };
    }

    

    private addToCoinInventory(denomination: number, quantity: number) {
        const existingCoin = this.coins.get(denomination);
        if (existingCoin) {
            existingCoin.quantity += quantity;
        } else {
            throw new Error("Received an unsupported coin denomination");
        }
    }

    public setProductPrice(productId: number, newPrice: number, key: string): void {
        if (!this.isAuthorized(key)) throw new Error("Unauthorized access");

        const product = this.products.get(productId);
        if (!product) throw new Error("Product not found");

        product.price = newPrice;
    }

    public restockProduct(productId: number, quantity: number, key: string): void {
        if (!this.isAuthorized(key)) throw new Error("Unauthorized access");

        const product = this.products.get(productId);
        if (!product) throw new Error("Product not found");

        product.quantity += quantity;
    }

    public updateCoins(denomination: number, quantity: number, key: string): void {
        if (!this.isAuthorized(key)) throw new Error("Unauthorized access");

        const coin = this.coins.get(denomination);
        if (!coin) throw new Error("Coin denomination not found");

        coin.quantity += quantity;
    }
}

const initialProducts: Product[] = [
    { id: 1, name: "Water Bottle", price: 150, quantity: 10 }, // Price in cents
    { id: 2, name: "Chocolate Bar", price: 100, quantity: 20 },
    { id: 3, name: "Chips", price: 75, quantity: 15 },
    { id: 4, name: "Cookies", price: 95, quantity: 10 }
];

const initialCoins: Coin[] = [
    { denomination: 25, quantity: 50 }, // 25 cents coins
    { denomination: 10, quantity: 100 }, // 10 cents coins
    { denomination: 5, quantity: 200 },  // 5 cents coins
    { denomination: 1, quantity: 500 }   // 1 cent coins
];

const maintenanceKey = "secureMaintenanceKey123";


// export const vendingMachine = new VendingMachine(initialProducts, initialCoins, maintenanceKey);


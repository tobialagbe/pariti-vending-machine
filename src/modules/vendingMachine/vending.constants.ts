import { Coin, Product } from "./vending.interface";

export const initialProducts: Product[] = [
    { id: 1, name: "Water", price: 150, quantity: 10 }, // Price in cents
    { id: 2, name: "Chocolate", price: 100, quantity: 20 },
    { id: 3, name: "Chips", price: 75, quantity: 15 },
    { id: 4, name: "Cookies", price: 95, quantity: 10 }
  ];
        
export const initialCoins: Coin[] = [
    { denomination: 25, quantity: 50 }, // 25 cents coins
    { denomination: 10, quantity: 100 }, // 10 cents coins
    { denomination: 5, quantity: 200 },  // 5 cents coins
    { denomination: 1, quantity: 500 }   // 1 cent coins
  ];
  
export const acceptedDenominations = [1, 5, 10, 25];
        
export const maintenanceKey = "secureMaintenanceKey123";
const prompt = require('prompt-sync')();


class Shop {
    constructor(name, rent) {
      this.name = name;
      this.rent = rent;
    }
  }
  
  class ShoppingComplex {
    constructor() {
      this.shops = [];
    }
  
    addShop(shop) {
      this.shops.push(shop);
    }
  
    getTotalRent() {
      let totalRent = 0;
      for (let shop of this.shops) {
        totalRent += shop.rent;
      }
      return totalRent;
    }
  }
  
  function main() {
    const complex = new ShoppingComplex();
  
    const numShops = prompt('Enter the number of shops in the complex:');
  
    for (let i = 1; i <= numShops; i++) {
      const name = prompt(`Enter the name of shop ${i}:`);
      const rent = parseFloat(prompt(`Enter the rent for shop ${i}:`));
      const shop = new Shop(name, rent);
      complex.addShop(shop);
    }
  
    const totalRent = complex.getTotalRent();
    console.log(`The total rent of all shops in the complex is: ${totalRent}`);
  }
  
  // Call the main function to start the program
  main();
  
const MongoClient = require('mongodb').MongoClient;
const prompt = require('prompt-sync')();

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class ShoppingComplex {
  constructor(db) {
    this.collection = db.collection('rent');
  }

  async addShop(shop) {
    await this.collection.insertOne(shop);
  }

  async getAllShops() {
    return await this.collection.find({}).toArray();
  }

  async updateShop(name, updatedRent) {
    await this.collection.updateOne({ name: name }, { $set: { rent: updatedRent } });
  }

  async deleteShop(name) {
    await this.collection.deleteOne({ name: name });
  }

  async getTotalRent() {
    const shops = await this.getAllShops();
    let totalRent = 0;
    for (let shop of shops) {
      totalRent += shop.rent;
    }
    return totalRent;
  }
}

async function main() {
  const uri = 'mongodb+srv://sumedha_vijay:Sumedha04@cluster0.iyskhyh.mongodb.net/school?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
  const databaseName = 'Complex';
  const collectionName = 'rent';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully.');

    const db = client.db(databaseName);
    const complex = new ShoppingComplex(db);

    let choice;
    do {
      console.log('\n--- CRUD Operations ---');
      console.log('1. Add a shop');
      console.log('2. Get all shops');
      console.log('3. Update shop rent');
      console.log('4. Delete a shop');
      console.log('5. Exit');

      choice = prompt('Enter your choice (1-5):');

      switch (choice) {
        case '1':
          const name = prompt('Enter the name of the shop:');
          const rent = parseFloat(prompt('Enter the rent for the shop:'));
          const shop = new Shop(name, rent);
          await complex.addShop(shop);
          console.log('Shop added.');
          break;
        case '2':
          const shops = await complex.getAllShops();
          console.log('All Shops:', shops);
          break;
        case '3':
          const shopToUpdateName = prompt('Enter the name of the shop to update:');
          const updatedRent = parseFloat(prompt('Enter the updated rent:'));
          await complex.updateShop(shopToUpdateName, updatedRent);
          console.log('Shop updated.');
          break;
        case '4':
          const shopToDeleteName = prompt('Enter the name of the shop to delete:');
          await complex.deleteShop(shopToDeleteName);
          console.log('Shop deleted.');
          break;
        case '5':
          console.log('Exiting...');
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    } while (choice !== '5');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

// Call the main function to start the program
main();

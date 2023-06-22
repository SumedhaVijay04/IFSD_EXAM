const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const databaseName = 'Complex';
const collectionName = 'rent';
const connectionURL = `mongodb+srv://sumedha_vijay:Sumedha04@cluster0.iyskhyh.mongodb.net/Complex?retryWrites=true&w=majority`;
;

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function disconnectFromDatabase() {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    process.exit(1);
  }
}

const rentSchema = new mongoose.Schema({
  name: String,
  rent: Number,
}, { collection: collectionName });

const Rent = mongoose.model('Rent', rentSchema);

async function main() {
  try {
    await connectToDatabase();

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
          const rentItem = new Rent({ name, rent });
          await rentItem.save();
          console.log('Shop added.');
          break;
        case '2':
          const shops = await Rent.find();
          console.log('All Shops:', shops);
          break;
        case '3':
          const shopToUpdateName = prompt('Enter the name of the shop to update:');
          const updatedRent = parseFloat(prompt('Enter the updated rent:'));
          const shopToUpdate = await Rent.findOne({ name: shopToUpdateName });
          if (shopToUpdate) {
            shopToUpdate.rent = updatedRent;
            await shopToUpdate.save();
            console.log('Shop updated.');
          } else {
            console.log('Shop not found.');
          }
          break;
        case '4':
          const shopToDeleteName = prompt('Enter the name of the shop to delete:');
          const deletedShop = await Rent.findOneAndDelete({ name: shopToDeleteName });
          if (deletedShop) {
            console.log('Shop deleted.');
          } else {
            console.log('Shop not found.');
          }
          break;
        case '5':
          console.log('Exiting...');
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    } while (choice !== '5');

    await disconnectFromDatabase();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the main function to start the program
main();

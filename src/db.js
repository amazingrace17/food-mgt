import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DB_STRING;
const dbConnection = {
  getConnect: async () => {
     
    try {
      
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

      })
      ;
      console.log('DB connection successful');

    } catch(err) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

export default dbConnection;

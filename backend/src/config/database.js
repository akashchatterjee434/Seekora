import mongoose from 'mongoose';

const connectToDB = async () => {

  const conn = await mongoose.connect(process.env.MONGO_URI);
  // console.log(`MongoDb connected: ${conn.connection.host}`);
  console.log("Host:", conn.connection.host);
console.log("Database:", conn.connection.name);

}

export default connectToDB;

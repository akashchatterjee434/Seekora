import mongoose from 'mongoose';
import dns from 'dns'

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
const connectToDB = async () => {

  const conn = await mongoose.connect(process.env.MONGO_URI);
  // console.log(`MongoDb connected: ${conn.connection.host}`);


}

export default connectToDB;

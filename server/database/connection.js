import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();
const mongourl = process.env.MONGO_DB_URL;

const connection = async () => {
  const connect = await mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  });
  return connect;
};

export default connection;
// mongodb://localhost:27017

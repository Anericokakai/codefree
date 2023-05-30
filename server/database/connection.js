import mongoose from "mongoose";
import {MongoClient,ServerApiVersion}from 'mongodb'
import * as dotenv from "dotenv";
dotenv.config()
const mongourl=process.env.MONGO_DB_URL

const connection = async() => {

  const connect= await mongoose.connect(mongourl)
    return connect
};

export default connection;
// mongodb://localhost:27017
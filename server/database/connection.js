import mongoose from "mongoose";
import {MongoClient,ServerApiVersion}from 'mongodb'
import * as dotenv from "dotenv";
dotenv.config()
const mongourl=process.env.MONGO_DB_URL

const connection = async () => {

  const client=new MongoClient(mongourl,{
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
  
  const connect= await (await client.connect())
    return connect
};

export default connection;
// mongodb://localhost:27017
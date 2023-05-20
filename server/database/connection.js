import mongoose from "mongoose";

const connection = async () => {
  const connect = await mongoose
    .connect("mongodb://127.0.0.1:27017/codefree")
   
  return connect;
};

export default connection;
// mongodb://localhost:27017
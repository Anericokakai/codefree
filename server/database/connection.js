import mongoose from "mongoose";

const connection = async () => {
  const mongourl=process.env.MONGO_DB_URL
  
  const connect= await mongoose.connect(mongourl,{
        
            useNewurlParser:true,
        
            useUnifiedTopology:true,
        
    })
    return connect
};

export default connection;
// mongodb://localhost:27017
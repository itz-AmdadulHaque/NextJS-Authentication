import mongoose from "mongoose";

// this function needed on every file that make database request
export async function connect() {
  try {
    console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI as string);
    const connection = mongoose.connection;
    //listener
    connection.on("connected", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on('error', (err)=>{
        console.log('MongoDB connection error. Please make sure Mongodb is running. ' + err);
        process.exit();
    })

  } catch (err) {
    console.log("something went wrong");
    console.log(err);
  }
}

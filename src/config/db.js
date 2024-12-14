import mongoose from 'mongoose';
const connectDB = async () => {
  try{
    await mongoose.connect('mongodb://localhost:27017/Techdock')
    console.log(`Connected to Mongo DB Database`);
    
  }catch(error){
    console.log(`MONGO Connect Error`);
  }
}
export default connectDB;
import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect('mongodb+srv://ayhandasyuvarlar:05522967929@ayhandasyuvarlar.cbbdb.mongodb.net/test');
    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (errors) {
    return Promise.reject(errors.message);
  }
};

export default connectMongo;

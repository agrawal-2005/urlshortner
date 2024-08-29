import mongoose from "mongoose";

const connectToMongoDB = async(url) => {
    return mongoose.connect(url);
}

export default connectToMongoDB;
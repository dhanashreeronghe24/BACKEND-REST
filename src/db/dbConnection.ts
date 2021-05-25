import mongoose from "mongoose";

export async function connectDB() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        poolSize:10
    };
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        , options)
        .then(() => { console.log("Connected to Atlas!") })
        .catch((err) => { console.log(err) })
}

export const closeDBConnection = async () => {
    await mongoose.disconnect();
};
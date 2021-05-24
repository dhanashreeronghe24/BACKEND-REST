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
        'mongodb+srv://<your_db_user>:<your_DB_password>@<your_mongo_DB_cluster>.typix.mongodb.net/<your_db_name>?wretryWrites=true&w=majority'
        , options)
        .then(() => { console.log("Connected to Atlas!") })
        .catch((err) => { console.log(err) })
}

export const closeInMongodConnection = async () => {
    await mongoose.disconnect();
};
const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/noteplus";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
}

connectToMongo().catch(err => console.log(err));


module.exports = connectToMongo;
const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("Wait connecting to the database")

    mongoose
    .connect(
        "mongodb+srv://lugus:5G6h7j8k9l@cluster0.uqehqaq.mongodb.net/?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((error) => console.log(error))
};

module.exports = connectDatabase;
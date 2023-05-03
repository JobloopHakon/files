const mongoose = require("mongoose");

const connectDB = async () =>
{
    try 
    {
        await mongoose.connect(process.env.DATABASE_URI,
        {
            /*
                useUnifiedTopology: true is an option for the MongoDB driver that enables the new topology engine. This new engine provides a more flexible and powerful way to discover and connect to MongoDB servers and includes built-in support for server selection, retryable writes, and connection pools.
                useNewUrlParser: true is an option for the MongoDB driver that enables the use of the new URL parser. This new parser provides a more strict and consistent parsing of connection strings and is more resistant to malformed connection strings.
                Both options are passed in when connecting to MongoDB to ensure the best performance and stability of the connection.
            */
            useUnifiedTopology: true,
            useNewUrlParser: true
        });    
    } 
    catch (err) 
    {
        console.log(err);
    }
}

module.exports = connectDB;
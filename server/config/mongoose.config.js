// Import 'mongoose' module from node_modules
const mongoose = require("mongoose")

// Name of database
const database = "chatapp"

// Name of connection
const connection = `mongodb://0.0.0.0:27017/${database}`

/**
 * Creates connection to MongoDB instance. Then, output
 * message indication whether connection is established or not.
 */
mongoose.connect(connection).then(() => {
    console.log(`Database connection established: ${database}`)
}).catch((err) => {
    console.log('Error establishing connection: ', err)
})
import mongoose from "mongoose";

// export  async function connect() {
//     try {
//         // mongoose.connect(process.env.MONGO_URI!)
//         // const connection = mongoose.connection

//         connection.on('connected', () => {
//             console.log('MongoDb connection successfully')
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDb connection error', + err)
//             process.exit()
//         })

//     } catch (error: any) {
//         console.log('Something went wrong')
//         console.log(error.message)
//     }
// }
// connect()

// // second
// // import mongoose from 'mongoose'

const connect = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected : ${conn.connection.host}`)

    }
    catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}
// connect()
export default connect

// export default connect
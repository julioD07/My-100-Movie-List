import mongoose from 'mongoose';
import 'colors'

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Base de datos online'.green)
    } catch (error) {
        console.log(error.message.red)
    }
}
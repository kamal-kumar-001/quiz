import mongoose from 'mongoose'

const connectDb = handler => async (req, res)=>{
    if( mongoose.connections[0].readyState){
        return handler(req, res)
    }
    // await mongoose.connect("mongodb://kamal:%40mongod8@ac-bhaee3p-shard-00-00.qhpam01.mongodb.net:27017,ac-bhaee3p-shard-00-01.qhpam01.mongodb.net:27017,ac-bhaee3p-shard-00-02.qhpam01.mongodb.net:27017/test?replicaSet=atlas-q931k6-shard-0&ssl=true&authSource=admin")
    await mongoose.connect("mongodb://kamal:%40mongod8@ac-bhaee3p-shard-00-00.qhpam01.mongodb.net:27017,ac-bhaee3p-shard-00-01.qhpam01.mongodb.net:27017,ac-bhaee3p-shard-00-02.qhpam01.mongodb.net:27017/Quiz?replicaSet=atlas-q931k6-shard-0&ssl=true&authSource=admin")
    // await mongoose.connect(process.env.MONGO_URL, {
    //     useNewUrlParser: true,
    //     })
        // console.log(process.env.MONGO_URL);
    return handler(req, res);
}
export default connectDb; 
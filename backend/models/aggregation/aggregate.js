// const mongoose = require("mongoose");

// const Collection = require("../collectionsModel");
// const Item = require("../itemsModel");
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// // let docs = connectDB.collection("collections").aggregate([{ $size: "$items" }]);

// const c = Collection.aggregate([{ $size: "$items" }]);

// // const d = Collection.collection("collections")
// //   .aggregate([{ $size: "$items" }])
// //   .exec((err, items) => {
// //     if (err) throw err;
// //     console.log(items);
// //   });
// // model.aggregate([{ $match: { age: { $gte: 21 } } }]);
// for await (const doc of c) {
//   console.log(doc.name);
// }
// console.log(c);
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mati123:mati123@cluster0.db3a5x8.mongodb.net/mernapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect(async (err) => {
  const collection = client.db("test").collection("collections");
  // perform actions on the collection object
  const pipeline = [
    {
      numberofItems: { $size: "$items" },
    },
  ];
  const agg = await collection.aggregate(pipeline);
  console.log(agg);
  client.close();
});

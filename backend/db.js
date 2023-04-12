const express = require("express");
const mongoose = require("mongoose");
const mongooseURL = "mongodb+srv://ashwinparmar897:parmar@cluster0.yf3zlps.mongodb.net/fapp?retryWrites=true&w=majority"


const DB = mongoose.connect(mongooseURL).then(async() => {
    console.log('Connection successful');

    // Perform operations on the database here

    // Fetch food item data
    const fetched_data = await mongoose.connection.db.collection("food_items");
     const foodArray=[]
    fetched_data.find({}).forEach( function( data) {
      foodArray.push(data)
     global.food_items=foodArray;
    });

// Fetch food cotegory Data

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catArray=[]
    foodCategory.find({}).forEach(function (catData){

      catArray.push(catData)
      global.food_Category=catArray;
    })



}).catch((err) => {
    console.log('Connection error:', err);
});


// const connectToDB = async () => {

//     await mongoose.connect(mongooseURL, { useNewUrlParser: true });
//     console.log("Connected")



// }

module.exports = DB;




// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://ashwinparmar897:parmar@cluster0.yf3zlps.mongodb.net/fapp?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("fapp");
//     const coll = db.collection("food_items");

//     // find code goes here
//     const cursor = coll.find();

//     // iterate code goes here
//     // await cursor.forEach(console.log);
//     const dataArray=[]

//     await cursor.forEach( function(myDoc) 
//     {  dataArray.push(myDoc)

//      } );
//     //  console.log(dataArray)
//      global.food_items=dataArray;
//      console.log(global.food_items)
     
     
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

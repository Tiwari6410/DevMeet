const mongodb = require("mongodb");
URL= "mongodb+srv://namastedev:Namastenodejs@namastenode.s2rbd.mongodb.net/?appName=NamasteNode"
// URL = "mongodb+srv://namastedev:Namastenodejs@namastenode.s2rbd.mongodb.net/"
const url = URL;
const client = new mongodb.MongoClient(url);

const dbName = "Hello"

async function main(){
    await client.connect();
    console.log("connected to database successfully")

    const db = client.db(dbName)
    const collection = db.collection("User")

    
// find all documents in the collection
    const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);


//Insert one doclument in the collection 
// const insertResult = await collection.insertMany([{firstName:"Ramesh", LastName:"sharma", age:29, city:"Delhi" }])
// console.log("inserted documents =>", insertResult)

    return "done."
}

main().then(console.log).catch(console.error).finally(()=>client.close())


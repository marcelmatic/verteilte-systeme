const MongoClient = require("mongodb").MongoClient;
console.log("start connection process");

// Connection URL and database name
const url =
  "mongodb+srv://admin:admin@verteilte-systeme.h3nncb9.mongodb.net/test?appname=mongodb-vscode+0.10.0";
const dbName = "mydb";
console.log("added connection string");

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("try connecting");

// Use connect method to connect to the Server
client.connect(function (err) {
  if (err) throw err;
  console.log(err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Define the new user document
  const newUser = {
    username: "testUser",
    password: "12345",
    role: "user",
  };

  // Insert the new user document into the "users" collection
  db.collection("users").insertOne(newUser, function (err, result) {
    if (err) throw err;
    console.log("New user created:", result.ops[0]);
    client.close();
  });
});

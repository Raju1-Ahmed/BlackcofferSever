const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.omxy1x5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run() {
  try {
    await client.connect();
    //Data Base File Collection
    const UserInfoCollection = client.db('BlackcofferData').collection('userinfo');
    // const dataCollection = client.db('jsonData').collection('data');

    //user collect api
    app.get('/data', async (req, res) => {
      const data = await UserInfoCollection.find().toArray();
      res.send(data);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From Blackcoffer!')
})

// app.all("*", (req, res) => {
//   res.send("No route found");
// })

app.listen(port, () => {
  console.log(`Example Blackcoffer listening on port ${port}`)
})
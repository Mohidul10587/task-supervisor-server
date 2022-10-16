const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sxzjch1.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        console.log('connected')
        const tasksCollection = client.db("tasks_information").collection("single_task");

        app.get('/', async (req, res) => {
            
            
            res.send({name:'mohid'})


        })

        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = tasksCollection.find(query)
            const taskCollectionArray = await cursor.toArray()
            res.send(taskCollectionArray)


        })


        app.post('/task', async (req, res) => {

            const newTask = req.body;

            const result = await tasksCollection.insertOne(newTask);

            res.send(result)


        });


    } finally {

    }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
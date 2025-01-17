const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('')
app.post('/add', (req, res => {
    consttask = req.body.task;

}))

app.listen(3001, () => {
    console.log("server is Running")
})
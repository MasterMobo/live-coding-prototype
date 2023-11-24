const express = require('express')
const app = express()

const cors = require('cors')

let session = {
    sId: '123',
    status: 'inactive'
}
app.use(cors())
app.use(express.json())

app.get('/api/v1', (req, res) => {
    res.json({message: "Hello World"})
})

app.get('/api/v1/session/:id',(req, res) => {
    const sessionId = req.params.id;
    // Find session with ID
    res.json(session)
})

app.patch('/api/v1/session/:id', (req, res) => {
    const {status, liveShareUrl} = req.body
    session.status = status
    session.liveShareUrl = liveShareUrl
    res.json(session)
})

app.listen(3000, console.log('Listening on port 3000'))
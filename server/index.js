const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("regieter", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
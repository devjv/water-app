import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.use((req, res) => res.status(404).send('Not found'))

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

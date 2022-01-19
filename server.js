let express = require("express")
var bodyParser = require('body-parser')

let {create, read, update, deleteById} = require("./src/controller/NewsletterController")

let app = express()

var jsonParser = bodyParser.json()

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/src/views'))
app.use(express.static(__dirname + '/src'))
app.set('view engine', 'html');


app.get("/", (req, res) => {
    res.render("index")
})

// API


// Create
app.put("/api/newsletter", jsonParser, create)

// Read
app.get("/api/newsletter", read)

// Update
app.post("/api/newsletter", jsonParser, update)

// Delete
app.delete("/api/newsletter", jsonParser, deleteById)

app.listen(8080, () => {
    console.log('Server wurde auf http://localhost:8080 gestartet...')
})
let express = require("express")

let {list} = require("./src/controller/NewsletterController")

let app = express()

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/src/views'))
app.use(express.static(__dirname + '/src/assets'))
app.set('view engine', 'html');


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/api/newsletter", list)

app.listen(8080, () => {
    console.log('Server wurde auf http://localhost:8080 gestartet...')
})
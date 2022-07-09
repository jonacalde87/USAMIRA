const express = require("express")
const app = express()
require("dotenv").config()
// const expressJwt = require("express-jwt");
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 9000

const path = require("path") // heroku deployment

//middleware
app.use(morgan("dev"))
app.use(express.json())

// ... other app.use middleware HEROKU
app.use(express.static(path.join(__dirname, "client", "build")))

//db
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/USAMIRA-db",
    {useNewUrlParser: true},
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

//routes
app.use('/auth', require('./routes/authRouter.js'));
//app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/posts', require('./routes/postsRouter.js'));
app.use('/api/posts/comments', require('./routes/commentRouter.js'));

//error handler
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

// Right before your app.listen(), add this: HEROKU
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})



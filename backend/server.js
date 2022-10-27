require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

// main
console.log(process.env.NODE_ENV)
connectDB()

// Middlewares 
app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// Routers
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Resource Not Found'})        
    } else {
        res.type('txt').send('404 Resource Not Found')
    }
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

/*
    Things get started small and tidy, but 
    mess up unconceivably fast, 
    A formidable monster of monolith ends up, usually.

    Man, however wise and nice,
    tends to be too confident in one's potency,
    but neglect obstacles lay ahead. 

    Words are vulgar and momentary, 
    Scripts are celestial and perpetual. 

    Coincidence, is what you had expected but did not. 
 */
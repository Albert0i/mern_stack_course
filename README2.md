# "Re-visiting MERN stack"


## Prologue
<span style="font-size: 36px; font-weight: bold;">L</span>ast Friday, after hours and hours wandering in the dark alleys, my head was tumultuously flooding with remembrance and swelled badly. Wild and furious shriek resound violently in my ears, *tinnitus* grew stronger as i grew weaker. Faint and dizzy as i was, shoddy and shabby as i was, the idea of re-visiting an old friend have dawned upon me. My body urged me to lay down for a while but my brain refused to do so. On second thoughts, I decided to stay alone not because I was poverty-stricken, but because I didn't want my weary and almost devastated countenance to be seen. 

I stumbled back to my lodging, and was so hungry and thirst, laying unconsciously on the couch and ask "what have i done?", "what should i do?"... Have you ever feel hungry form something? I meant those metaphysical desire you have ever tried or intended to pursuit, no matter failure and success ended up. 


## I. Repertoire
This [MERN](https://www.mongodb.com/mern-stack) project is made up of 13 tutorials that builds upon each other much like chapters of a book. 

MERN is an acronym that use the first letter of four complementary technologies. **M** is for [MongoDB](https://www.mongodb.com/), **E** is for [ExpressJS](https://expressjs.com/), **R** is for [React](https://reactjs.org/) and **N** is for [NodeJS](https://nodejs.org/en/). So if MERN stack is full stack that leads us to ask what is full stack? and why is the MERN stack considered to be full stack? 

A full stack application means that it requires code that runs on the server and code that runs on the browser. The code that runs on the server is referred to as the **back end** and thee code that runs on the browser is referred to as the **front end**. The front end and back end are typically two completely separated code repositories. In a large enterprise full stack project, there may be a team of developers that work on the front end and another separated team of developers that work on the back end. As a full stack developer you should be able to work on both the front end and the back end if needed. 

The back end for the MERN stack is a [REST](https://restfulapi.net/) API, a REST API also known as a restful API is an interface that two computer systems used to exchange information securely over the internet. The back end will receive requests from the front end, those requests can be classified as [CRUD](https://www.codecademy.com/article/what-is-crud) operations. CRUD is another four letter acronym like MERN, the letters of CRUD stands for create, read, update and delete. These terms also indicate which types of [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) will be used in the applicaiton, for example post relates to create, get relates to read, patch and put request relates to update, and delete has an exact match. 


## II. Chapter 1~2: Structure of REST API server
```
|   .gitignore
|   UserStories.md
|   package-lock.json
|   package.json
|   server.js
|
+---config
|       allowedOrigins.js
|       corsOptions.js
|
+---middleware
|       errorHandler.js
|       logger.js
|
+---public
|   \---css
|           style.css
|
+---routes
|       root.js
|
\---views
        404.html
        index.html
```
Have a look of the source tree, as you may see .gitignore, basic routes, style sheet, welcome page and 404 page, logger, error handler are properly setup. 

server.js
```javascript
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
```

package.json
```json
{
  "name": "lesson_02",
  "version": "1.0.0",
  "description": "techNotes MERN Project",
  "main": "server.js",
  "scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "date-fns": "^2.29.1",
    "express": "^4.18.1",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}
```
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is important in public API and was nicely configured, [date-fns](https://www.npmjs.com/package/date-fns) and [uuid](https://www.npmjs.com/package/uuid) are used in logger, express.json and [cookie-parser](https://www.npmjs.com/package/cookie-parser) are added but not functioning yet.


## II. Chapter 3~4: Models and Controllers

Differences between Web API and MVC.
| Model View Controller | Web API |
| ----------- | ----------- |
| MVC is used for developing Web applications that reply to both data and views | Web API is used for generating HTTP services that reply only as data. |

Only JSON and XML data are present in Web API unlike MVC where return views, action results, etc are present. In a word, 

**Web API = MVC - views + security enhancement**
```
|   .gitignore
|   UserStories.md
|   package-lock.json
|   package.json
|   server.js
|
+---config
|       allowedOrigins.js
|       corsOptions.js
|       dbConn.js
|
+---controllers
|       notesController.js
|       usersController.js
|
+---middleware
|       errorHandler.js
|       logger.js
|
+---models
|       Note.js
|       User.js
|
|
+---public
|   \---css
|           style.css
|
+---routes
|       noteRoutes.js
|       root.js
|       userRoutes.js
|
\---views
        404.html
        index.html
```

User.js
```javascript
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)
```

Note.js
```javascript
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)
```

server.js
```javascript
. . . 
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
```

dotenv
.env
```
NODE_ENV=development

DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.9elkk.mongodb.net/techNotesDB?retryWrites=true&w=majority
```

mongoose 
mongoose-sequence 


## III. 

## XII. Reference
1. [MERN Stack Full Tutorial & Project | Complete All-in-One Course | 8 Hours](https://youtu.be/CvCiNeLnZ00)
12. [William Morris Quotes](https://www.laurasbeau.co.uk/william-morris-quotes-2/)


## Epilogue 

## EOF (2023/01/20)
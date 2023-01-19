# "Re-visiting MERN stack"


## Prologue
This [MERN](https://www.mongodb.com/mern-stack) project is made up of 13 tutorials that builds upon each other much like chapters of a book. 

MERN is an acronym that use the first letter of four complementary technologies. **M** is for [MongoDB](https://www.mongodb.com/), **E** is for [ExpressJS](https://expressjs.com/), **R** is for [React](https://reactjs.org/) and **N** is for [NodeJS](https://nodejs.org/en/). So if MERN stack is full stack that leads us to ask what is full stack? and why is the MERN stack considered to be full stack? 

A full stack application means that it requires code that runs on the server and code that runs on the browser. The code that runs on the server is referred to as the **back end** and thee code that runs on the browser is referred to as the **front end**. The front end and back end are typically two completely separated code repositories. In a large enterprise full stack project, there may be a team of developers that work on the front end and another separated team of developers that work on the back end. As a full stack developer you should be able to work on both the front end and the back end if needed. 

The back end for the MERN stack is a [REST](https://restfulapi.net/) API, a REST API also known as a restful API is an interface that two computer systems used to exchange information securely over the internet. The back end will receive requests from the front end, those requests can be classified as [CRUD](https://www.codecademy.com/article/what-is-crud) operations. CRUD is another four letter acronym like MERN, the letters of CRUD stands for create, read, update and delete. These terms also indicate which types of [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) will be used in the applicaiton, for example post relates to create, get relates to read, patch and put request relates to update, and delete has an exact match. 


## I. Chapter 1~2: Structure of REST API server
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


## II. Chapter 3~4: Structure of REST API server

```
```

```javascript
```

```xml
```

## II. 

## IV. Reference
1. [MERN Stack Full Tutorial & Project | Complete All-in-One Course | 8 Hours](https://youtu.be/CvCiNeLnZ00)
2. [William Morris Quotes](https://www.laurasbeau.co.uk/william-morris-quotes-2/)


## Epilogue 

<span style="font-size: 36px; font-weight: bold;">A</span>fter hours and hours of wandering in the dark city, odds and ends filled up my mind, I was thinking my head will explode at any moment, the idea of re-visiting an old friend dawned upon me. My ready-made coat was old and shabby, holes on both elbows, large patch was on the left knee of my trouses... on second thoughts, I perfer to stay alone because I don't want my pale and weary countenance be seen. 

I walk back to my lodging, i was so hungry and thirst laying unconsciously on the couch and ask "what have i done?", "what shall i do?"

Previously, I wrote a summary of MERN stack project. Now, I am going to write it down in more details. 


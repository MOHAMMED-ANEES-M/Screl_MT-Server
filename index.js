const express = require('express')
const app = express();
var cors = require('cors');
const errorHandler = require('./middleware/errorHandler')


const dotenv = require('dotenv');
dotenv.config()

const db = require('./config/db')
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

app.use(errorHandler)



db.query('SELECT 1')
    .then(() => { 
        console.log("db Connection succeeded")
        app.listen(PORT,
            () => console.log(`Server is running on port ${PORT}`))
    })
    .catch(err => { console.log('db.Connection failed \n' + err );})


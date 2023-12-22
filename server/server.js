const express = require('express')
const path = require('path');
const mainRouter = require('./routes/api');
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


//route handlers
if (process.env.NODE_ENV === 'production') {
 app.use('/build', express.static(path.join(__dirname, '../build')))
}
app.use('/', mainRouter)



app.listen(3000, ()=>{console.log(`listening port 3000`)})
module.exports = app
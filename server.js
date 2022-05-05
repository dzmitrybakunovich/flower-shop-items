require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const multerUpload = require('./cloudinary/multerConfig').multerUpload;

const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const err = require('./error/errorHandlingMiddleware')

const port = 8080
const host = '0.0.0.0'


const app = express();
app.use(cors());
// app.use(express.json())

app.use(multerUpload.single('img'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

//the last
app.use(err)
//

app.get('/', (req, res) => {
    res.status(200).json({message: "WORKING"})
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, host, () => console.log(`running on http://${host}:${port}`));
    } catch (e) {
        console.log(e)
    }
}

start()
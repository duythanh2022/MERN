const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const bodyparser = require('body-parser');
const productRouter = require('./routers/product')
const PORT = process.env.PORT || 5000;
dotenv.config()
app.use(bodyparser.json());
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors())

mongoose.connect(process.env.MONGOOSE_DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Successfully connected to database");
}).catch((error)=>{
    console.log("database connection failed. exiting now...");
    console.error(error);
})
app.use('/api/auth',authRouter)
app.use('/api',productRouter)
app.listen(PORT,()=>{
    console.log(`Serving on port ${PORT}`);
})


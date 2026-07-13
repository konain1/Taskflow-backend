const dotenv = require('dotenv').config()
const express = require('express')

const app = express()


app.listen(process.env.PORT,()=>console.log('port is running on ',process.env.PORT))
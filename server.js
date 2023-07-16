require('dotenv').config()

// libs
const express=require("express")
const path=require("path")
const morgan=require("morgan")
const cookieParser = require('cookie-parser')

const errorsMdl=require("./middlewares/error")

const app=express()

// define routes
const indexRoutes=require("./routes/index")
// const imageRoutes=require("./routes/images")


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(express.static('public'))
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())

// use routes
// app.use('/images',imageRoutes)
app.use('/',indexRoutes)


// error middlewares
app.use(errorsMdl.handler404)
app.use(errorsMdl.handlerServerErrors)

// server setup
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is listeng at PORT ${PORT}`);
})
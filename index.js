const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 6000
require('dotenv').config()
const browseRouter = require('./routes/browseRouter')
const blogRouter = require('./routes/blogRouter')
const studentRouter = require('./routes/studentRouter')
const auth = require('./middleware/authenticate')
const notfound = require('./utils/notfound')

app.use(express.json())
app.use('/api/v2', browseRouter)
app.use('/api/v2/blog', auth, blogRouter)
app.use('/api/v2/student', auth, studentRouter)

app.get('/', (req, res)=>{
    res.status(200).json({success: true, message: 'server is live'})
})
app.use(notfound)

app.get('/test', auth, (req, res)=>{
    res.send('passed authentication')
})

const startServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, ()=>{
            console.log(`Server is listen on PORT ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

startServer()
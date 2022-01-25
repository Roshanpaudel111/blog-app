const express = require('express')
const mongoose =require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1/blog').then(()=>{
    console.log('Database connected Successfully');
}).catch((err)=>{
    console.log(err);
})

app.use(express.urlencoded({extended: false}))
app.use('/articles',articleRouter)



app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index',{articles: articles})
})

app.listen(3000,()=>{
    console.log('Listening to port 3000');
})

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const methodoverride = require('method-override');

const app = express();

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.once('open',()=>{
    console.log('Connected to database');
})

app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use(methodoverride('_method'));
app.use('/blogs',blogRouter);

app.get('/',async (req,res)=>{
    const blogs = await Blog.find().sort({date: 'desc'})
    res.render('index',{blogs:blogs});
})

app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000');
})
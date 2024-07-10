const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/new',(req,res)=>{
    res.render('new',{blog: new Blog()});
})

router.get('/:id',async (req,res)=>{
    const blog = await Blog.findById(req.params.id);
    if(blog==null){
        res.redirect('/');
    }
    res.render('showblog',{blog:blog});
})

router.get('/edit/:id',async (req,res)=>{
    const blog = await Blog.findById(req.params.id);
    res.render('edit',{blog:blog});
})

router.post('/',async (req,res)=>{
    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try{
        await blog.save()
        res.redirect(`/blogs/${blog.id}`);
    }catch(error){
        res.render('new',{blog:blog});
        console.log(error.message)
    }
})

router.put('/:id',async (req,res)=>{
    let blog = await Blog.findById(req.params.id);
    blog.title = req.body.title
    blog.description = req.body.description
    blog.markdown = req.body.markdown
    try{
        await blog.save();
        res.redirect(`/blogs/${blog.id}`)
    }catch(error){
        console.log(error.message);
    }
})

router.delete('/:id',async (req,res)=>{
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Blog = require('../models/articles');


router.get('/', async (req, res) => {
    try {
        try {
            const articles = await Blog.find()
            res.status(200).render('index', {articles: articles});
        } catch (error) {
            res.status(204)
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
    }
    
});


router.get('/new', (req,res) => {
    res.render('new', {articles: {}})
});



router.get('/:slug', async (req,res) => {
    try {
            
            const found = await Blog.exists({slug: req.params.slug})
            if (found) {
                const article = await Blog.findOne({slug: req.params.slug})
                res.status(200).render('show-created', {articles: article})
            } else {
                res.status(404).json({ message: "Article not exist"})
            }
            
    } catch (error) {
        console.log(error.message)
    }
});





router.post('/new', async (req,res) => {
    const article = new Blog({
        title: req.body.title,
        description: req.body.description,
        markDown: req.body.markDown
    })
    try {
        await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (error) {
        console.log(error.message)
        res.render('new', {articles: article})
    }
   
});


router.get('/edit/:id', async (req,res) => {
    try {
        const found = await Blog.exists({_id: req.params.id})
        if (found) {
            const article = await Blog.findById(req.params.id)
            res.render('edit', {articles: article})
        } else {
            res.status(404).json({ message: "Article not exist"})
        }   
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/edit/:id', async (req,res) => {
    try {
        const found = await Blog.exists({_id: req.params.id})
        if (found) {
            const article = await Blog.findById(req.params.id)
            article.title = req.body.title
            article.description = req.body.description
            article.markDown = req.body.markDown
            await article.save()
            res.redirect('/articles')
        }
        else {
            res.status(404).json({ message: "Article not exist"})
        }
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const found = await Blog.exists({_id: req.params.id})

        if (found) {
            await Blog.findByIdAndDelete(req.params.id)
            res.redirect('/articles')
        } else {
            res.status(404).json({ message: "Article not exist"})
         }
    } catch (error) {
        console.log(error.message)
    }
   
   
})

module.exports = router;
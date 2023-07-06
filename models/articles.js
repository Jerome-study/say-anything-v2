const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    description: {
        type: String,
        required: true
    },
    markDown: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})


articleSchema.pre('validate', function (next) {
    
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if (this.markDown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markDown))
       
    }
    marked.use({
        mangle: false,
        headerIds: false
    })

    
    next()
})


module.exports = mongoose.model('blog', articleSchema)
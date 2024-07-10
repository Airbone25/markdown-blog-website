const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    html: {
        type: String,
        required: true
    }
})

blogschema.pre('validate',function(next){
    if(this.markdown){
        this.html = dompurify.sanitize(marked.parse(this.markdown));
    }
    next();
})

module.exports = mongoose.model('Blog',blogschema);